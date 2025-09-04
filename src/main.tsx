import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import 'leaflet/dist/leaflet.css';
import App from './App.tsx'
import './index.css'
import { LocalStorageProvider } from './store/localStorageContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalStorageProvider>
      <App />
    </LocalStorageProvider>
  </StrictMode>,
)
