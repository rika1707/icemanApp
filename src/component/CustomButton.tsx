import { IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { downloadFeaturesAsExcel } from '../utils/exportAllToExcel';
import type { Feature, Geometry } from 'geojson';
interface ButtonProps {
    features: Feature<Geometry, any>[],
    fileName: string
}

export default function CustomButton({ features, fileName }: Readonly<ButtonProps>) {
    return (
        <IconButton edge='end' aria-label='download' sx={{
            color: '#074dafff',
            borderRadius: '10px',
            padding: '4px 2px',
            '&:hover': {
                backgroundColor: '#7d8bf3',


            }
        }}
            onClick={() => downloadFeaturesAsExcel(features, fileName)}
        >
            <FileDownloadIcon />
        </IconButton>
    );
}
