import { Box, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMap } from 'react-leaflet';

export default function CustomZoomControl() {
    const map = useMap();

    const zoomIn = () => map.zoomIn();
    const zoomOut = () => map.zoomOut();

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 16, // o top: 16, según prefieras
                right: 16, // o left: 16, según prefieras
                zIndex: 1000,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    borderRadius: 7,
                }}
            >
                <IconButton onClick={zoomIn} sx={{ color: 'white' }}>
                    <AddIcon />
                </IconButton>
                <IconButton onClick={zoomOut} sx={{ color: 'white' }}>
                    <RemoveIcon />
                </IconButton>
            </Paper>
        </Box>
    );
}
