import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Map } from 'leaflet';
import { useLocalStorageContext } from '../../store/localStorageContext';
import { toggleGeoJsonOnMap } from '../../utils/addGeojson';
import type { Feature } from 'geojson';

interface GeoChipProps {
    label: string;
    map: Map;
    geojson: any;
    markerShape: 'circle-red' | 'circle-blue';
    onFeatureClick: (feature: Feature) => void;
}

const GeoChip = ({ label, map, geojson, markerShape, onFeatureClick }: GeoChipProps) => {
    const { removeGeoChip, toggleVisibility } = useLocalStorageContext()

    const handleDelete = () => {
        removeGeoChip(label);
        toggleVisibility(label);
        toggleGeoJsonOnMap(map, geojson, label, markerShape, onFeatureClick)

    };

    return (
        <Stack direction="row" spacing={1}>
            <Chip label={label} onDelete={handleDelete} />
        </Stack>
    );
}

export default GeoChip;
