import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <div className='my-black-text-container'>
    <App />
  </div>
  // </StrictMode>,
)
