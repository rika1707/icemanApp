import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { GeojsonProps } from '../interface/geojson.interface';
import { toggleGeoJsonOnMap } from '../utils/addGeojson';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, CardActions } from '@mui/material';
import CustomButton from './CustomButton';
import type { Feature, Geometry } from 'geojson';
import { useState } from 'react';
import { useLocalStorageContext } from '../store/localStorageContext';

export default function ItemGeo({ rangeDate, fileName, geojson, map, markerShape }: Readonly<GeojsonProps>) {
    const [isVisible, setisVisible] = useState<boolean>(false);
    const { modal: { handleFeatureClick } } = useLocalStorageContext()
    return (
        map ? (<Card sx={{ maxWidth: 275, position: 'relative' }} variant="outlined">
            <CardContent
                onClick={() => {
                    toggleGeoJsonOnMap(map, geojson, fileName, markerShape, handleFeatureClick)
                    setisVisible(prev => !prev)
                }}
                sx={{
                    cursor: 'pointer'
                }}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {rangeDate}
                    </Typography>
                    {isVisible && <VisibilityIcon color='info' />}
                </Box>
                <Typography variant="h6" component="div">
                    {fileName.toUpperCase()}
                </Typography>
            </CardContent>
            <CardActions sx={{ position: 'absolute', right: '1rem', bottom: '4px' }}>
                <CustomButton
                    features={geojson.features as Feature<Geometry, any>[]}
                    fileName={`${fileName}.xls`}
                />
            </CardActions>
        </Card>
        ) : (<div>No hay Datos...</div>)
    );
}
