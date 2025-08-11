import { useEffect, useState } from 'react';
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  List,
  ListItem,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
import L from 'leaflet';
import CustomZoomControl from './CustomZoom';
import Oleaje from '../data/oleaje_velocity.json'
import Vientos from '../data/viento_antartico.json';
import Vientos_2018 from '../data/vientos_2018.json';
import Oleaje_2018 from '../data/oleaje_2018.json';
import ModalDetails from './modals/ModalDetails';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import CustomButton from './CustomButton';
import ModalDetailsWind from './modals/ModalDetailsWind';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { BaseMapSelector } from './LayersMaps';
import TileLayerContainer from './TileLayerContainer';
import LayersDataContainer from './LayersDataContainer';
import UploadForm from './modals/FormUploadFile';

const CenterMap = () => {
  const map = useMap();
  map.setView([0, 0], 2);
  return null;
};

interface FitAllBoundsProps {
  layersData: { data: FeatureCollection; active: boolean }[];
}

const FitAllBounds = ({ layersData }: FitAllBoundsProps) => {
  const map = useMap();

  useEffect(() => {
    const visibleLayers = layersData.filter(l => l.active && l.data);

    if (visibleLayers.length > 0) {
      const bounds = L.latLngBounds([]);

      visibleLayers.forEach(layerInfo => {
        const geoLayer = L.geoJSON(layerInfo.data);
        bounds.extend(geoLayer.getBounds());
      });

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [layersData, map]);

  return null;
};


const SidebarWithMap = () => {
  const [selectedMap, setSelectedMap] = useState('baseMap');
  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [modalOpenWind, setModalOpenWind] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Feature | null>(null);
  const [selectedDataWind, setSelectedDataWind] = useState<Feature | null>(null);
  const [openCollapse, setOpenCollapse] = useState({
    2017_2018: false,
    2018_2019: false,
    2019_2020: false
  })

  const toggleCollapse = (section: keyof typeof openCollapse) => {
    setOpenCollapse((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFeatureClick = (feature: Feature) => {
    setSelectedData(feature);
    setModalOpen(true);
  };

  const handleFeatureWindClick = (feature: Feature) => {
    setSelectedDataWind(feature);
    setModalOpenWind(true);
  };

  const [layers, setLayers] = useState({
    oleaje_2017_2018: false,
    viento_2017_2018: false,
    oleaje_2018_2019: false,
    viento_2018_2019: false,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };



  return (
    <Box sx={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Sidebar personalizado */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 220,
            boxSizing: 'border-box',
            backgroundColor: '#1976d1',
            opacity: 0.8,
            color: 'white',
            padding: 2,
            position: 'absolute',
            zIndex: '1000',
            height: '100%'
          },
        }}
      >
        {/* Encabezado del panel */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            Capas del Mapa
          </Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <IconButton sx={{
          color: '#ffffff',
          width: 'max-content'
        }}
          onClick={() => setOpenForm(true)}
        >
          <FileUploadIcon />
        </IconButton>

        <Divider sx={{ my: 2, borderColor: 'gray' }} />

        {/* Lista de capas con iconos */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            mb: 2,
            boxShadow: '0px 1px rgba(255,255,255, 0.5)',
            py: '3px'
          }}
          onClick={() => toggleCollapse(20172018)}>
          <Typography sx={{ fontWeight: 500 }}>2017 - 2018</Typography>
          {openCollapse[20172018] ? <ExpandLess /> : <ExpandMore />}
        </Box>
        <Collapse in={openCollapse[20172018]}>

          <List>
            <ListItem disablePadding
              secondaryAction={
                layers.oleaje_2017_2018 && <CustomButton features={Oleaje.features as Feature<Geometry, any>[]} fileName='Oleajes_2017_2018.xls' />
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={layers.oleaje_2017_2018}
                    onChange={() => toggleLayer('oleaje_2017_2018')}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'white', // color del icono cuando está seleccionado
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WavesIcon sx={{ mr: 1 }} />
                    <Typography>Oleajes</Typography>
                  </Box>
                }
              />
            </ListItem>
            <ListItem disablePadding
              secondaryAction={
                layers.viento_2017_2018 && (
                  <CustomButton
                    features={Vientos.features as Feature<Geometry, any>[]}
                    fileName="Vientos_2017_2018.xls"
                  />
                )
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={layers.viento_2017_2018}
                    onChange={() => toggleLayer('viento_2017_2018')}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'white', // color del icono cuando está seleccionado
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WindPowerIcon sx={{ mr: 1 }} />
                    <Typography>Viento</Typography>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </Collapse>
        {/* //2018 - 2019 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            mb: 2,
            boxShadow: '0px 1px rgba(255,255,255, 0.5)',
            py: '3px'
          }}
          onClick={() => toggleCollapse(20182019)}>
          <Typography sx={{ fontWeight: 500 }}>2018 - 2019</Typography>
          {openCollapse[20182019] ? <ExpandLess /> : <ExpandMore />}
        </Box>
        <Collapse in={openCollapse[20182019]}>
          <List>
            <ListItem disablePadding
              secondaryAction={
                layers.oleaje_2018_2019 && <CustomButton features={Oleaje_2018.features as Feature<Geometry, any>[]} fileName='Oleajes_2018_20189xls' />
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={layers.oleaje_2018_2019}
                    onChange={() => toggleLayer('oleaje_2018_2019')}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'white', // color del icono cuando está seleccionado
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WavesIcon sx={{ mr: 1 }} />
                    <Typography>Oleajes</Typography>
                  </Box>
                }
              />
            </ListItem>
            <ListItem disablePadding
              secondaryAction={
                layers.viento_2018_2019 && <CustomButton features={Vientos_2018.features as Feature<Geometry, any>[]} fileName='Vientoss_2018_20189xls' />
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={layers.viento_2018_2019}
                    onChange={() => toggleLayer('viento_2018_2019')}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'white', // color del icono cuando está seleccionado
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WindPowerIcon sx={{ mr: 1 }} />
                    <Typography>Viento</Typography>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </Collapse>
      </Drawer>

      {/* Botón flotante para abrir el panel */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1200,
            backgroundColor: '#1976d1',
            opacity: 0.9,
            color: 'white',
            '&:hover': {
              backgroundColor: '#074dafff',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* open maps */}
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
      <MapContainer center={[4.6, -74.1]} zoom={6} style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <FitAllBounds
          layersData={[
            { data: Oleaje as any, active: layers.oleaje_2017_2018 },
            { data: Vientos as any, active: layers.viento_2017_2018 },
            { data: Oleaje_2018 as any, active: layers.oleaje_2018_2019 },
            { data: Vientos_2018 as any, active: layers.viento_2018_2019 },
          ]}
        />
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
          <LayersDataContainer
            layers={layers}
            handleFeatureClick={handleFeatureClick}
            handleFeatureWindClick={handleFeatureWindClick}
          />
        </LayerGroup>
        <ModalDetails
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          feature={selectedData}
        />
        <ModalDetailsWind
          open={modalOpenWind}
          onClose={() => setModalOpenWind(false)}
          feature={selectedDataWind}
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
