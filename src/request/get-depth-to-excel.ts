const URL_DEPTH_API: string = 'https://api-dimar.onrender.com/meteorologico/';

export async function downloadExcelByYear(year: number | string): Promise<void> {
    const endpoint = `${URL_DEPTH_API}mediciones/descargar-excel-estaciones/${year}`;
    const filename = `ICEMAN_estaciones_${year}.xlsx`;
    const MIME_XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    const resp = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': MIME_XLSX
        }
    });

    if (!resp.ok) {
        throw new Error(`Error al descargar el Excel: ${resp.status} ${resp.statusText}`);
    }

    const blob = await resp.blob();

    const url = URL.createObjectURL(new Blob([blob], { type: MIME_XLSX }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export default downloadExcelByYear;
