import type { Feature, Geometry } from 'geojson';
import type { GeojsonProps } from '../interface/geojson.interface';

export function findFeaturesAtSameLocation(geojson: GeojsonProps["geojson"]): Record<string, Feature[]> {
    const featuresByLocation: Record<string, Feature[]> = {};
    
    geojson.features.forEach(feature => {
        if (feature.geometry && 'coordinates' in feature.geometry) {
            const coords = feature.geometry.coordinates;
            const key = `${coords[0]},${coords[1]}`;
            
            if (!featuresByLocation[key]) {
                featuresByLocation[key] = [];
            }
            featuresByLocation[key].push(feature);
        }
    });
    
    return featuresByLocation;
}