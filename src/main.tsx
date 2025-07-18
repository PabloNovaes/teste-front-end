import { Home } from "@/pages/home"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
