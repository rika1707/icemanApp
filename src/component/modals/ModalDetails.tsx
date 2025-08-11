import type { Feature, Geometry } from 'geojson';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React from 'react';
import {
    Modal,
    Box,
    Typography,
    Divider,
    IconButton,
    Button
} from '@mui/material';
import { downloadFeatureAsExcel } from '../../utils/exportExcel';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    feature: Feature | null;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    borderRadius: 2,
    color: '#8c8888',
    boxShadow: 24,
    p: 3
};

const ModalDetails: React.FC<ModalProps> = ({ open, onClose, feature }) => {
    if (!feature) return null;
    const { properties, geometry } = feature
    const isValidGeometry = (geom: Geometry): geom is Extract<Geometry, { coordinates: any }> => {
        return 'coordinates' in geom && Array.isArray(geom.coordinates);
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} className='bg-slate-200'>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 600
                        }}>
                        Estación: {properties?.station}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {isValidGeometry(geometry) && (
                    <>
                        <Typography variant='h6'><strong>Coordenadas.</strong></Typography>
                        <Box display={'flex'} gap={2}>
                            <Typography fontSize={14}><strong>Latitud: </strong>
                                <span className='text-blue-500'>{geometry.coordinates[1]}</span>
                            </Typography>
                            <Typography fontSize={14}><strong>Longitud: </strong>
                                <span className='text-blue-500'>{geometry.coordinates[0]}</span>
                            </Typography>
                        </Box>
                    </>
                )}

                <Divider sx={{ my: 1 }} />

                <Typography display={'flex'} justifyContent={'space-between'}><strong>Fecha:</strong> {properties?.date}</Typography>
                <Typography display={'flex'} justifyContent={'space-between'}><strong>Hora:</strong> {properties?.time}</Typography>
                <Typography display={'flex'} justifyContent={'space-between'}><strong>Dirección de ola:</strong> {properties?.wave_direction} (QF: {properties?.qf_direction})</Typography>
                <Typography display={'flex'} justifyContent={'space-between'}><strong>Altura de ola:</strong> {properties?.wave_hight} m (QF: {properties?.qf_hight})</Typography>
                <Typography display={'flex'} justifyContent={'space-between'}><strong>Periodo de ola:</strong> {properties?.wave_period} s (QF: {properties?.qf_period})</Typography>
                <Box display={'flex'} justifyContent={'center'} mt={2}>
                    <Button variant="contained" sx={{
                        borderRadius: '25px'
                    }}
                        onClick={() => downloadFeatureAsExcel(feature)}
                    >
                        <FileDownloadIcon />
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalDetails;
