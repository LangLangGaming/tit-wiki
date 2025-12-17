import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './assets/components/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </StrictMode>,
)
