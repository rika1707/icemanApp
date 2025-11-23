import type { Feature, Geometry } from 'geojson';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Divider,
    IconButton,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { downloadFeatureAsExcel } from '../../utils/exportExcel';

const keyExclude: string[] = ['objectid', 'globalid', 'created_date_ms', 'last_edited_date_ms']

interface ModalProps {
    open: boolean;
    onClose: () => void;
    feature: Feature | null;
    features?: Feature[];
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    borderRadius: 2,
    color: '#8c8888',
    boxShadow: 24,
    p: 3,
    maxHeight: '80vh',
    overflowY: 'auto'
};

const ModalDetails: React.FC<ModalProps> = ({ open, onClose, feature, features = [] }) => {
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

    useEffect(() => {
        setCurrentFeatureIndex(0);
    }, [feature]);

    if (!feature) return null;

    const showNavigation = features.length > 1;
    const currentFeature = features[currentFeatureIndex] || feature;
    const { properties, geometry } = currentFeature;

    const handleNext = () => {
        setCurrentFeatureIndex(prev =>
            prev === features.length - 1 ? prev : prev + 1
        );
    };

    const handlePrevious = () => {
        setCurrentFeatureIndex(prev =>
            prev === 0 ? prev : prev - 1
        );
    };

    const isValidGeometry = (geom: Geometry): geom is Extract<Geometry, { coordinates: any }> => {
        return 'coordinates' in geom && Array.isArray(geom.coordinates);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} className="bg-slate-200">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        Estación: {properties?.station ?? properties?.estacion}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {isValidGeometry(geometry) && (
                    <>
                        <Typography variant="h6">
                            <strong>Coordenadas</strong>
                        </Typography>
                        <Box display={'flex'} gap={2}>
                            <Typography fontSize={14}>
                                <strong>Latitud: </strong>
                                <span className="text-blue-500">{geometry.coordinates[1]}</span>
                            </Typography>
                            <Typography fontSize={14}>
                                <strong>Longitud: </strong>
                                <span className="text-blue-500">{geometry.coordinates[0]}</span>
                            </Typography>
                        </Box>
                    </>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Navegación entre features */}
                {showNavigation && (
                    <Box sx={{
                        mt: 2,
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <IconButton
                            onClick={handlePrevious}
                            disabled={currentFeatureIndex === 0}
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                        <Typography>
                            {currentFeatureIndex + 1} de {features.length}
                        </Typography>
                        <IconButton
                            onClick={handleNext}
                            disabled={currentFeatureIndex === features.length - 1}
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    </Box>
                )}

                {/* Tabla dinámica */}
                {properties && (
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Propiedad</strong></TableCell>
                                    <TableCell><strong>Valor</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(properties).map(([key, value]) => (
                                    !keyExclude.includes(key) &&
                                    <TableRow key={key}>
                                        <TableCell>{key}</TableCell>
                                        <TableCell>{String(value)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Box display={'flex'} justifyContent={'center'} mt={2}>
                    <Button
                        variant="contained"
                        sx={{ borderRadius: '25px' }}
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
