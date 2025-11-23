import { Radio, RadioGroup, FormControlLabel, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LayersProps {
    selectedMap: string
    onChange: (vlaue: string) => void
    setOpenMap: React.Dispatch<React.SetStateAction<boolean>>
    openMap: boolean
}

export const BaseMapSelector = ({ selectedMap, onChange, setOpenMap, openMap }: LayersProps) => {
    return (
        <RadioGroup
            value={selectedMap}
            onChange={(e) => {
                onChange(e.target.value)
                setOpenMap(false)
            }}
            sx={{
                color: 'white',
                zIndex: 1200,
                position: 'absolute',
                width: '200px',
                top: 50,
                transition: 'right .3s ease',
                right: `${openMap ? 0 : '-20%'}`,
                backgroundColor: '#1976d1',
                opacity: 0.9,
            }}
        >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton onClick={() => setOpenMap(false)} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                    Mapas Bases
                </Typography>
            </Box>
            <Divider sx={{ my: 1, borderColor: 'white' }} />
            <FormControlLabel
                sx={{
                    m: 0,
                    '&:hover': {
                        backgroundColor: '#074dafff',
                    }
                }}
                value="baseMap"
                control={<Radio sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'white'
                    }
                }} />}
                label="Base Map"

            />
            <FormControlLabel
                sx={{
                    m: 0,
                    '&:hover': {
                        backgroundColor: '#074dafff',
                    }
                }}
                value="sateliteMap"
                control={<Radio sx={{
                    color: 'white',
                    '&.Mui-checked': { color: 'white' }
                }} />}
                label="Satellite Map"
            />
            <FormControlLabel
                sx={{
                    m: 0,
                    '&:hover': {
                        backgroundColor: '#074dafff',
                    }
                }}
                value="topoMap"
                control={<Radio sx={{
                    color: 'white',
                    '&.Mui-checked': { color: 'white' }
                }} />}
                label="Topo Map"
            />
        </RadioGroup >
    );
};
