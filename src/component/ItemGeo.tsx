import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { GeojsonProps } from '../interface/geojson.interface';
import { toggleGeoJsonOnMap } from '../utils/addGeojson';

export default function ItemGeo({ rangeDate, fileName, geojson, map, markerShape }: Readonly<GeojsonProps>) {
    return (
        map ? (<Card sx={{ maxWidth: 275 }} variant="outlined" onClick={() => toggleGeoJsonOnMap(map, geojson, fileName, markerShape)}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {rangeDate}
                </Typography>
                <Typography variant="h6" component="div">
                    {fileName.toUpperCase()}
                </Typography>
            </CardContent>
        </Card>
        ) : (<div>No hay Datos...</div>)
    );
}
