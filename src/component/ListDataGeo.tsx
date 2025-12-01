import type { GeojsonProps, ListGeojsonProps } from "../interface/geojson.interface"
import ItemGeo from "./ItemGeo"
import { getDepth } from "../request/get-depth";
import CircularIndeterminate from "./modals/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, IconButton, Collapse } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const empresasImg = [
    // Puedes reemplazar estas rutas con las imágenes reales de las empresas
    { src: "/img/empresa1.png", alt: "Empresa 1" },
    { src: "/img/empresa2.png", alt: "Empresa 2" },
    { src: "/img/empresa3.png", alt: "Empresa 3" },
];

const ListDataGeo = ({ isWavesActive, isWindsActive, map }: ListGeojsonProps) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [windsData, setWindsData] = useState<GeojsonProps[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { data, isLoading: queryLoading } = useQuery<GeojsonProps[] | null>({
        queryKey: ['windsData', isWindsActive],
        queryFn: getDepth,
        enabled: isWindsActive,
    });

    useEffect(() => {
        if (isWindsActive) {
            setOpen(true); // Abrir panel por defecto si hay datos
            setTabIndex(0); // Seleccionar pestaña "Datos" por defecto
        } else {
            setWindsData(null);
            setOpen(false); // Cierra los tabs si isWindsActive es false
        }
    }, [isWindsActive]);

    useEffect(() => {
        if (data) {
            setWindsData(data);
        }
        setIsLoading(queryLoading);
    }, [data, queryLoading]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            maxWidth: "100vw",
            zIndex: 1300,
        }}>
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "relative",
            }}>
                <IconButton
                    sx={{
                        position: "relative",
                        top: 0,
                        bgcolor: "#1976d2",
                        color: "white",
                        boxShadow: 1,
                        mb: open ? 1 : 0,
                        transition: "margin-bottom 0.3s",
                        '&:hover': {
                            bgcolor: "#115293",
                        }
                    }}
                    onClick={() => setOpen(!open)}
                    size="small"
                >
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
            </Box>
            <Collapse in={open} orientation="vertical">
                {open && (
                    <Box sx={{
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 2,
                        p: 1,
                        width: "100%",
                        maxWidth: "100vw"
                    }}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            variant="standard"
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                minHeight: 0,
                                '& .MuiTab-root': {
                                    minHeight: 0,
                                    fontSize: 13,
                                    py: 0.5,
                                    px: 2,
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                    bgcolor: '#f5f5f5',
                                    mx: 0.5,
                                },
                                '& .Mui-selected': {
                                    bgcolor: 'white',
                                    fontWeight: 'bold',
                                    boxShadow: 1,
                                }
                            }}
                        >
                            <Tab label="Datos" sx={{ minHeight: 0, fontSize: 13, py: 0.5, px: 2 }} />
                            <Tab label="Creditos" sx={{ minHeight: 0, fontSize: 13, py: 0.5, px: 2 }} />
                        </Tabs>
                        <Box sx={{ mt: 2 }}>
                            {tabIndex === 0 && (
                                <div className="h-56 overflow-auto bg-slate-200 text-black p-2 flex gap-1 flex-wrap">
                                    {isLoading ? (
                                        CircularIndeterminate()
                                    ) : windsData && windsData.length > 0 ? (
                                        windsData.map((wind: GeojsonProps) => (
                                            <ItemGeo key={wind.fileName} {...wind} map={map} markerShape="circle-blue" />
                                        ))
                                    ) : (
                                        <Box sx={{ width: "100%", textAlign: "center", color: "gray", mt: 4 }}>
                                            Aún no hay elementos cargados.
                                        </Box>
                                    )}
                                </div>
                            )}
                            {tabIndex === 1 && (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", alignItems: "center", minHeight: 180 }}>
                                    {empresasImg.map((img) => (
                                        <Box key={img.alt} sx={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f3f3f3", borderRadius: 2 }}>
                                            <img src={img.src} alt={img.alt} style={{ maxWidth: "70px", maxHeight: "70px" }} />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Box>
                )}
            </Collapse>
        </Box>
    );
}

export default ListDataGeo
