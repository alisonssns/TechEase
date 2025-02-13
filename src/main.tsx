import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CarrinhoProvider } from "./components/contexts/CartContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </StrictMode>,
)
