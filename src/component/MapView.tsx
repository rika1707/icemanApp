import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
const position: LatLngExpression | undefined = [0, 0]; // Madrid, España


const { BaseLayer } = LayersControl




export default function MapView() {

  return (
    <MapContainer center={position} zoom={2} style={{ height: '100%', width: '100%' }}>
      <LayersControl position="topright" >
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer name='OpenStreetMap_France'>
          <TileLayer
            attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
          />
        </BaseLayer>
        <BaseLayer name='OpenTopoMap'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          />
        </BaseLayer>
        <BaseLayer name='Stadia.AlidadeSmoothDark'>
          <TileLayer
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}'
          />
        </BaseLayer>
      </LayersControl>
    </MapContainer>
  );
}
