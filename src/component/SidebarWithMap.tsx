import { useState, type JSX } from 'react';
import {
  Drawer,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MapIcon from '@mui/icons-material/Public';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import WavesIcon from '@mui/icons-material/Waves';
import WindPowerIcon from '@mui/icons-material/Air';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import AnchorIcon from '@mui/icons-material/Anchor';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  MapContainer,
  LayerGroup,
  useMap,
} from 'react-leaflet';
import { Map } from 'leaflet';
import CustomZoomControl from './CustomZoom';
import ModalDetails from './modals/ModalDetails';
import { BaseMapSelector } from './LayersMaps';
import TileLayerContainer from './TileLayerContainer';
import UploadForm from './modals/FormUploadFile';
import { useLocalStorageContext } from '../store/localStorageContext';

const CenterMap = () => {
  const map = useMap();
  map.setView([0, 0], 2);
  return null;
};


interface SidebarWithMap {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isWavesActive: boolean
  isWindsActive: boolean
  setIsWindsActivate: React.Dispatch<React.SetStateAction<boolean>>
  setIsWavesActivate: React.Dispatch<React.SetStateAction<boolean>>
  setMap: React.Dispatch<React.SetStateAction<Map>>

}


const SidebarWithMap = ({ open, setOpen, setMap, setIsWavesActivate, setIsWindsActivate, isWavesActive, isWindsActive }: Readonly<SidebarWithMap>): JSX.Element => {
  const [selectedMap, setSelectedMap] = useState('baseMap');
  const [openMap, setOpenMap] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { value } = useLocalStorageContext();
  const { modal: { setModalOpen, modalOpen, selectedData, relatedFeatures } } = useLocalStorageContext()


  const platformTypes = [
    { name: 'Barcos', icon: <DirectionsBoatIcon /> },
    { name: 'Boyas', icon: <AnchorIcon /> },
    { name: 'Estaciones', icon: <LocationOnIcon /> }
  ];

  const dataTypes = [
    { name: 'Olas', icon: <WavesIcon />, active: isWavesActive },
    { name: 'Viento', icon: <WindPowerIcon />, active: isWindsActive }
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100vw', position: 'relative' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            borderTop: '1px solid',
            boxSizing: 'border-box',
            backgroundColor: '#1976d2',
            color: 'white',
            padding: 1,
            position: 'absolute',
            zIndex: '1000',
            height: '100%',
          },
        }}
      >
        {/* Encabezado con botón de cierre */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {value && (
          <IconButton sx={{
            color: '#ffffff',
            my: .5,
            '&:hover': {
              borderRadius: '8px',
              backgroundColor: '#074dafff',
            }
          }} onClick={() => setOpenForm(true)}>
            <FileUploadIcon />
          </IconButton>
        )}

        <Divider sx={{ my: 1, borderColor: 'gray' }} />

        {/* Matriz de datos */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {/* Header row */}
          <Box sx={{ display: 'flex', gap: 2, ml: 8.5 }}>
            {platformTypes.map((platform, index) => (
              <IconButton key={index} sx={{
                color: 'white',
                border: '1px solid white',
                borderRadius: 1,
                width: 35,
                height: 35,
                padding: 0,
              }}>
                {platform.icon}
              </IconButton>
            ))}
          </Box>

          {/* Data rows */}
          {dataTypes.map((dataType, rowIndex) => (
            <Box key={rowIndex} sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
              <IconButton
                sx={{
                  color: dataType.active ? 'yellow' : 'white',
                  border: dataType.active ? '1px solid yellow' : '1px solid white',
                  borderRadius: 1,
                  width: 35,
                  height: 35,
                  padding: 0
                }}
                onClick={() => {
                  if (dataType.name === 'Olas') {
                    setIsWavesActivate(!isWavesActive);
                    setIsWindsActivate(false);
                  } else {
                    setIsWindsActivate(!isWindsActive);
                    setIsWavesActivate(false);
                  }
                }}
              >
                {dataType.icon}
              </IconButton>
              {platformTypes.map((_, colIndex) => (
                <IconButton
                  key={colIndex}
                  sx={{
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: 1,
                    width: 35,
                    height: 35,
                    padding: 0
                  }}
                >
                </IconButton>
              ))}
            </Box>
          ))}
        </Box>
      </Drawer>
      {!openMap && (
        <IconButton
          onClick={() => setOpenMap(true)}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1200,
            backgroundColor: '#1976d1',
            opacity: 0.9,
            color: 'white',
            '&:hover': {
              backgroundColor: '#074dafff',
            },
          }}
        >
          <MapIcon />
        </IconButton>
      )}

      {/* Mapa Leaflet */}
      <MapContainer
        center={[4.6, -74.1]}
        zoom={6} style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
        ref={(mapInstance) => {
          if (mapInstance) {
            setMap(mapInstance);
          }
        }}
      >
        <BaseMapSelector
          selectedMap={selectedMap}
          onChange={(value: string) => setSelectedMap(value)}
          setOpenMap={setOpenMap}
          openMap={openMap}
        />
        <CustomZoomControl />
        <CenterMap />
        <LayerGroup>
          <TileLayerContainer selectedMap={selectedMap} />
        </LayerGroup>
        <ModalDetails
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          feature={selectedData}
          features={relatedFeatures}
        />
        <UploadForm
          open={openForm}
          onClose={() => setOpenForm(false)}
        />
      </MapContainer>
    </Box>
  );
};
export default SidebarWithMap;
