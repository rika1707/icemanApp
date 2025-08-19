import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { GeoJSON } from 'react-leaflet'
import Oleaje from '../data/oleaje_velocity.json'
import Vientos from '../data/viento_antartico.json';
import Vientos_2018 from '../data/vientos_2018.json';
import Oleaje_2018 from '../data/oleaje_2018.json';
import L from 'leaflet';
import type { GroupKey, LayerKey } from './SidebarWithMap';

interface LayersProps {
    activeLayers: Record<GroupKey, LayerKey | null>
    handleFeatureClick: (feature: Feature<Geometry, GeoJsonProperties>) => void
    handleFeatureWindClick: (feature: Feature<Geometry, GeoJsonProperties>) => void
}

const LayersDataContainer = ({ activeLayers, handleFeatureClick, handleFeatureWindClick }: LayersProps) => {

    return (
        <>
            {activeLayers["2017_2018"] === "oleaje_2017_2018" && (
                <GeoJSON
                    key="oleaje-layer_2017"
                    data={Oleaje as any}
                    pointToLayer={(_, latlng) =>
                        L.circleMarker(latlng, {
                            radius: 5,
                            fillColor: '#f00',
                            color: '#000',
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8,
                        })
                    }
                    onEachFeature={(feature: Feature, layer) => {
                        layer.on({
                            click: () => handleFeatureClick(feature)
                        });
                    }}
                />
            )}
            {activeLayers["2017_2018"] === "viento_2017_2018" && (
                <GeoJSON
                    key="viento_2017_2018-layer"
                    data={Vientos as any}
                    pointToLayer={(_, latlng) =>
                        L.circleMarker(latlng, {
                            radius: 5,
                            fillColor: '#0000ff',
                            color: '#000',
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8,
                        })
                    }
                    onEachFeature={(feature: Feature, layer) => {
                        layer.on({
                            click: () => handleFeatureWindClick(feature)
                        });
                    }}

                /> // Aquí iría VelocityLayer cuando esté listo
            )}
            {/* //2018 - 2019 */}
            {activeLayers["2018_2019"] === "oleaje_2018_2019" && (
                <GeoJSON
                    key="oleaje_2018_2019-layer"
                    data={Oleaje_2018 as any}
                    pointToLayer={(_, latlng) =>
                        L.circleMarker(latlng, {
                            radius: 5,
                            fillColor: '#f00',
                            color: '#000',
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8,
                        })
                    }
                    onEachFeature={(feature: Feature, layer) => {
                        layer.on({
                            click: () => handleFeatureClick(feature)
                        });
                    }}
                />
            )}
            {activeLayers["2018_2019"] === "viento_2018_2019" && (
                <GeoJSON
                    key="viento_2018_2019-layer"
                    data={Vientos_2018 as any}
                    pointToLayer={(_, latlng) =>
                        L.circleMarker(latlng, {
                            radius: 5,
                            fillColor: '#0000ff',
                            color: '#000',
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8,
                        })
                    }
                    onEachFeature={(feature: Feature, layer) => {
                        layer.on({
                            click: () => handleFeatureWindClick(feature)
                        });
                    }}
                /> // Aquí iría VelocityLayer cuando esté listo
            )}
        </>
    )
}

export default LayersDataContainer
