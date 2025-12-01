import type { Feature, Geometry } from 'geojson';
import * as XLSX from 'xlsx';

/**
 * Descarga un archivo Excel (.xlsx) con los datos de un array de features GeoJSON
 */
export function downloadFeaturesAsExcel(features: Feature<Geometry, any>[], filename = 'features_data.xlsx') {
    if (!features || features.length === 0) return;

    const rows = features.map((feature) => {
        const { properties, geometry } = feature;

        // Extraer coordenadas si existen
        let coordinates: Record<string, number | string> = {};
        if ('coordinates' in geometry && Array.isArray(geometry.coordinates)) {
            const coords = geometry.coordinates as number[];
            if (typeof coords[0] === 'number') {
                coordinates = {
                    LONGITUD: coords[0], // Encabezado en mayúsculas
                    LATITUD: coords[1],
                };
            }
        }

        // Modifica los nombres de las propiedades a mayúsculas
        const newProperties: Record<string, any> = {};
        Object.keys(properties || {}).forEach(key => {
            newProperties[key.toUpperCase()] = properties[key];
        });

        return {
            ...newProperties,
            ...coordinates,
        };
    });

    // Convertir a hoja Excel
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Features');

    // Descargar archivo
    XLSX.writeFile(workbook, filename);
}
