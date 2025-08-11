import type { Feature, Geometry } from 'geojson';
import * as XLSX from 'xlsx';

export function downloadFeatureAsExcel(feature: Feature<Geometry, any>) {
    if (!feature) return;

    const { properties, geometry } = feature;

    // Extraer coordenadas si existen
    let coordinates: Record<string, number | string> = {};
    if ('coordinates' in geometry && Array.isArray(geometry.coordinates)) {
        const coords = geometry.coordinates as number[];
        coordinates = {
            latitud: coords[1],
            longitud: coords[0],
        };
    }

    // Combinar datos
    const data = {
        ...properties,
        ...coordinates,
    };

    // Convertir a hoja Excel
    const worksheet = XLSX.utils.json_to_sheet([data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feature');

    // Descargar archivo
    XLSX.writeFile(workbook, 'feature_data.xlsx');
}
