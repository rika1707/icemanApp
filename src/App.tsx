import SidebarWithMap from './component/SidebarWithMap'
import './App.css'
import ResponsiveAppBar from './component/AppBar'
import HeaderImagesBar from './component/HeaderImagesBar'
import { useState } from 'react'
import Login from './component/modals/Login'
import ListDataGeo from './component/ListDataGeo'
import type { Map } from 'leaflet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [open, setOpen] = useState<boolean>(true)
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  const [isWavesActive, setisWavesActive] = useState(false);
  const [isWindsActive, setisWindsActive] = useState(false);
  const [map, setMap] = useState<Map>();

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-map flex flex-col">
        <HeaderImagesBar />
        <ResponsiveAppBar
          open={open}
          setOpen={setOpen}
          setOpenLogin={setOpenLogin} />
        <SidebarWithMap
          open={open}
          setOpen={setOpen}
          isWavesActive={isWavesActive}
          isWindsActive={isWindsActive}
          setIsWavesActivate={setisWavesActive}
          setIsWindsActivate={setisWindsActive}
          setMap={setMap as React.Dispatch<React.SetStateAction<Map>>}
        />

        <ListDataGeo
          isWavesActive={isWavesActive}
          isWindsActive={isWindsActive}
          map={map as Map}
        />
        <Login
          open={openLogin}
          onClose={setOpenLogin}
        />
      </div>
    </QueryClientProvider>
  )
}

export default App
