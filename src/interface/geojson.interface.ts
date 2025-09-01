import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { Map } from 'leaflet';
export interface GeojsonProps {
    rangeDate: string
    fileName: string
    geojson: FeatureCollection<Geometry, GeoJsonProperties>
    map?: Map
    markerShape?: 'circle' | 'square'
}

export interface ListGeojsonProps {
    isWavesActive: boolean
    isWindsActive: boolean
    map: Map
}