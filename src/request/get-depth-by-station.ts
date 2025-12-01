import { downloadFeaturesAsExcel } from "../utils/exportAllToExcel";


const URL_DEPTH_API: string = 'https://api-dimar.onrender.com/meteorologico/';

export async function getDepthByStation(station: string, year: string): Promise<void | null> {
    try {
        const res = await fetch(`${URL_DEPTH_API}por-anio-y-estacion?year=${year}&station=${station}`,
            {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
        if (!res.ok) {
            console.error(`getDepth By Station: HTTP ${res.status} for year ${year}`);
            return null;
        }
        const geojson = await res.json();
        downloadFeaturesAsExcel(geojson.features, `Iceman_${station}_${year}.xlsx`);
    } catch (err) {
        console.error('getDepth by station error:', err);
        return null;
    }
}

