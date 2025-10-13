import L, { Map as LeafletMap, GeoJSON } from "leaflet";
import type { GeojsonProps } from "../interface/geojson.interface";
import type { Feature, Point, Geometry } from "geojson";

// Diccionario global de capas por id
const layersRegistry: Record<string, GeoJSON> = {};

/**
 * Alterna un geojson en el mapa (agrega o quita según exista)
 * @param map instancia del mapa Leaflet
 * @param geojson objeto GeoJSON válido
 * @param id identificador único de la capa (ej. fileName)
 * @param style estilo opcional para el geojson
 * @returns la capa activa (o null si se quitó)
 */
export function toggleGeoJsonOnMap(
    map: LeafletMap,
    geojson: GeojsonProps["geojson"],
    id: string,
    markerShape: 'circle-red' | 'circle-blue' = 'circle-red',
    onFeatureClick: (feature: Feature) => void,
    style?: L.PathOptions
): GeoJSON | null {
    if (layersRegistry[id]) {
        map.removeLayer(layersRegistry[id]);
        delete layersRegistry[id];
        return null;
    }

    // Agrupar features por ubicación
    const featuresByLocation = findFeaturesAtSameLocation(geojson);

    // Crear capa GeoJSON
    const geoJsonLayer = L.geoJSON(geojson, {
        style: style ?? {
            color: "blue",
            weight: 2,
            opacity: 0.6,
        },
        pointToLayer: (_feature, latlng) => {
            if (markerShape === "circle-red") {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: "#f00",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                });
            }
            if (markerShape === "circle-blue") {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: "#00f",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                });
            }

            return L.marker(latlng); // fallback
        },
        onEachFeature: (feature, layer) => {
            if (feature.properties?.station) {
                layer.on({
                    click: (e) => {
                        L.DomEvent.stopPropagation(e);
                        const coords = feature.geometry.coordinates;
                        const key = `${coords[0]},${coords[1]}`;
                        const features = featuresByLocation[key];

                        // Si hay múltiples features en esta ubicación, pasarlos todos
                        if (features && features.length > 1) {
                            onFeatureClick(features[0], features);
                        } else {
                            onFeatureClick(feature);
                        }
                    }
                });
            }
        },
    });

    // Agregar al mapa y guardar en el registro
    geoJsonLayer.addTo(map);
    layersRegistry[id] = geoJsonLayer;

    // Ajustar zoom
    map.fitBounds(geoJsonLayer.getBounds());

    return geoJsonLayer;
}

// Función para agrupar features por ubicación
function findFeaturesAtSameLocation(geojson: GeojsonProps["geojson"]) {
    const featuresByLocation: Record<string, Feature[]> = {};

    geojson.features.forEach((feature) => {
        const geometry = feature.geometry as Point;
        if (geometry.type === 'Point') {
            const coords = geometry.coordinates;
            const key = `${coords[0]},${coords[1]}`;

            if (!featuresByLocation[key]) {
                featuresByLocation[key] = [];
            }
            featuresByLocation[key].push(feature);
        }
    });

    return featuresByLocation;
}

