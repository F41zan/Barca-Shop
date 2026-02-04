import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CardContextProvider from './component/Context/CardContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <CardContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
     </CardContextProvider > 
  // </StrictMode>,
)
