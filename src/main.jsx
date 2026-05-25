import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AudioProvider } from './context/AudioContext.jsx'
import './index.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found. Check index.html.')
}

createRoot(root).render(
  <StrictMode>
    <AudioProvider>
      <App />
    </AudioProvider>
  </StrictMode>
)
