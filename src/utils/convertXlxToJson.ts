import * as XLSX from 'xlsx';

/**
 * Convierte un archivo Excel a JSON
 * @param {File} file - Archivo Excel (.xlsx o .xls) recibido desde un input
 * @returns {Promise<Array<Object>>} - Datos convertidos a JSON
 */
export const excelToJson = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                if (!e.target) return console.error('No hay data')
                const data = new Uint8Array(e.target.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                // Tomar la primera hoja
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convertir a JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });

                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (err) => reject(err);

        reader.readAsArrayBuffer(file);
    });
};
