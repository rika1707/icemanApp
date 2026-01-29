import { IconButton, CircularProgress } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import type { Feature, Geometry } from 'geojson';
import downloadExcelByYear from '../request/get-depth-to-excel';
import { useQuery } from '@tanstack/react-query';

interface ButtonProps {
    features: Feature<Geometry, any>[],
    fileName: string
}

export default function CustomButton({ features }: Readonly<ButtonProps>) {
    const dateData: string | undefined = features[0]?.properties?.fecha;
    const year: string | undefined = dateData ? dateData.split('-')[0] : undefined;

    const { isFetching, refetch } = useQuery({
        queryKey: ['downloadExcel', year],
        queryFn: async () => {
            if (year) {
                await downloadExcelByYear(year);
            }
        },
        enabled: false, // Solo ejecuta cuando se presiona el botón
    });

    return (
        <IconButton
            edge='end'
            aria-label='download'
            sx={{
                color: '#074dafff',
                borderRadius: '10px',
                padding: '4px 2px',
                '&:hover': {
                    backgroundColor: '#7d8bf3',
                }
            }}
            onClick={() => refetch()}
            disabled={isFetching || !year}
        >
            {isFetching ? <CircularProgress size={24} /> : <FileDownloadIcon />}
        </IconButton>
    );
}
