import SidebarWithMap from './component/SidebarWithMap'
import './App.css'
import ResponsiveAppBar from './component/AppBar'
import { useState } from 'react'
import Login from './component/modals/Login'
import ListDataGeo from './component/ListDataGeo'

function App() {
  const [open, setOpen] = useState<boolean>(true)
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  return (
    <div className="main-map flex flex-col">
      <ResponsiveAppBar open={open} setOpen={setOpen} setOpenLogin={setOpenLogin} />
      <SidebarWithMap open={open} setOpen={setOpen} />
      <ListDataGeo />
      <Login open={openLogin} onClose={setOpenLogin} />
    </div>
  )
}

export default App
