import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx' // Import du provider
import { ThemeProvider } from './context/ThemeContext.jsx' // Import du theme provider
import { OrderProvider } from './context/OrderContext'; // Import du nouveau context
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider> {/* On enveloppe ici */}
      <CartProvider>
        <OrderProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
)