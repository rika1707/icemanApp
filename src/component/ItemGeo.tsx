import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { GeojsonProps } from '../interface/geojson.interface';
import { toggleGeoJsonOnMap } from '../utils/addGeojson';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, CardActions } from '@mui/material';
import CustomButton from './CustomButton';
import type { Feature, Geometry } from 'geojson';
import { useLocalStorageContext } from '../store/localStorageContext';
import L from "leaflet";

export default function ItemGeo({ fileName, geojson, rangeDate, map, markerShape }: Readonly<GeojsonProps>) {
    const { modal: { handleFeatureClick }, visibility, toggleVisibility, addGeoChip, removeGeoChip } = useLocalStorageContext()

    const isVisible = visibility[fileName] ?? false;

    return (
        map ? (<Card sx={{ maxWidth: 250, position: 'relative' }} variant="outlined">
            <CardContent
                onClick={() => {
                    toggleGeoJsonOnMap(map, geojson, fileName, markerShape, handleFeatureClick)
                    toggleVisibility(fileName);
                    if (isVisible) {
                        removeGeoChip(fileName);
                    } else {
                        addGeoChip(fileName);
                    }
                    setTimeout(() => {
                        const bounds = L.latLngBounds([]);

                        map?.eachLayer((l: any) => {
                            if (l instanceof L.GeoJSON) {
                                const lb = l.getBounds();
                                if (lb.isValid()) {
                                    bounds.extend(lb);
                                }
                            }
                        });

                        if (bounds.isValid()) {
                            map?.fitBounds(bounds, { padding: [30, 30] });
                        }
                    }, 0);
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
            <CardActions sx={{ justifyContent: 'flex-end', paddingRight: 2 }}>
                <CustomButton
                    features={geojson.features as Feature<Geometry, any>[]}
                    fileName={`${fileName}.xls`}
                />
            </CardActions>
        </Card>
        ) : (<div>No hay Datos...</div>)
    );
}
