import L, { Map as LeafletMap, GeoJSON } from "leaflet";
import type { GeojsonProps } from "../interface/geojson.interface";
import type { Feature } from "geojson";

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
    markerShape: 'circle' | 'square' = 'circle',
    onFeatureClick: (feature: Feature) => void,
    style?: L.PathOptions
): GeoJSON | null {
    // Si ya existe → quitarla
    if (layersRegistry[id]) {
        map.removeLayer(layersRegistry[id]);
        delete layersRegistry[id];
        return null;
    }

    // Crear capa GeoJSON
    const geoJsonLayer = L.geoJSON(geojson, {
        style: style ?? {
            color: "blue",
            weight: 2,
            opacity: 0.6,
        },
        pointToLayer: (_feature, latlng) => {
            if (markerShape === "circle") {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: "#f00",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                });
            }
            if (markerShape === "square") {
                // dibuja un rectángulo de 10x10m en la posición
                const size = 0.0030; // aprox 11m, ajusta según zoom
                return L.rectangle(
                    [
                        [latlng.lat - size, latlng.lng - size],
                        [latlng.lat + size, latlng.lng + size],
                    ],
                    {
                        color: "#000",
                        weight: 1,
                        fillColor: "#00f",
                        fillOpacity: 0.8,
                    }
                );
            }

            return L.marker(latlng); // fallback
        },
        onEachFeature: (feature, layer) => {
            if (feature.properties?.station) {
                layer.on({
                    click: () => onFeatureClick(feature)
                });
                layer.bindTooltip(
                    `<strong>Estación:</strong> ${feature.properties.station}`,
                    { permanent: false, direction: "top" }
                );
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

