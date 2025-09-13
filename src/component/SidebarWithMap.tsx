import { useState, type JSX } from 'react';
import {
  Drawer,
  IconButton,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MapIcon from '@mui/icons-material/Public';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import WavesIcon from '@mui/icons-material/Waves';
import WindPowerIcon from '@mui/icons-material/Air';
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
  const { modal: { setModalOpen, modalOpen, selectedData } } = useLocalStorageContext()


  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100vw', position: 'relative' }}>
      {/* Sidebar personalizado */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 80, // más angosto porque solo hay iconos
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 100,
            borderTop: '1px solid',
            boxSizing: 'border-box',
            backgroundColor: '#1976d2',
            color: 'white',
            padding: 1,
            position: 'absolute',
            zIndex: '1000',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Encabezado con botón de cierre */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: "100%" }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {value && (
          <IconButton sx={{
            color: '#ffffff',
            my: .5,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              borderRadius: '8px',
              backgroundColor: '#074dafff',
            }
          }} onClick={() => setOpenForm(true)}>
            <FileUploadIcon />
            <Typography variant="caption" display="block" pt={1}>
              Cargar
            </Typography>
          </IconButton>
        )}

        <Divider sx={{ my: 1, borderColor: 'gray', width: '100%' }} />

        {/* Botón Oleajes */}
        <Box
          display={'flex'}
          gap={1}
          height={25}
          mb={2}
        >
          <IconButton
            sx={{
              color: isWavesActive ? 'yellow' : 'white',
              border: isWavesActive ? '1px solid yellow' : '1px solid white',
              borderRadius: 1,

            }}
            onClick={() => {
              setIsWavesActivate(!isWavesActive);
              setIsWindsActivate(false);
            }}
          >
            <WavesIcon />
          </IconButton>
        </Box>

        {/* Botón Viento */}
        <Box
          display={'flex'}
          gap={1}
          height={25}
        >
          <IconButton
            sx={{
              color: isWindsActive ? 'yellow' : 'white',
              border: isWindsActive ? '1px solid yellow' : '1px solid white',
              borderRadius: 1,
            }}
            onClick={() => {
              setIsWavesActivate(false);
              setIsWindsActivate(!isWindsActive);
            }}
          >
            <WindPowerIcon />
          </IconButton>
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
