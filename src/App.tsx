import SidebarWithMap from './component/SidebarWithMap'
import './App.css'
import ResponsiveAppBar from './component/AppBar'
import { useState } from 'react'
import Login from './component/modals/Login'

function App() {
  const [open, setOpen] = useState<boolean>(true)
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  return (
    <div className="main-map">
      <ResponsiveAppBar open={open} setOpen={setOpen} setOpenLogin={setOpenLogin} />
      <SidebarWithMap open={open} setOpen={setOpen} />
      <Login open={openLogin} onClose={setOpenLogin} />
    </div>
  )
}

export default App
