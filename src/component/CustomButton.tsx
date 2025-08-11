import { IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { downloadFeaturesAsExcel } from '../utils/exportAllToExcel';
import type { Feature, Geometry } from 'geojson';
interface ButtonProps {
    features: Feature<Geometry, any>[],
    fileName: string
}

export default function CustomButton({ features, fileName }: ButtonProps) {
    return (
        <IconButton edge='end' aria-label='download' sx={{
            color: '#ffffff',
            borderLeft: '1px solid #ffffff',
            borderRadius: 0,
            padding: '4px 2px',
            '&:hover': {
                backgroundColor: '#074dafff'
            }
        }}
            onClick={() => downloadFeaturesAsExcel(features, fileName)}
        >
            <FileDownloadIcon />
        </IconButton>
    );
}
