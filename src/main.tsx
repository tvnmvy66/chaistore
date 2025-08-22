import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux"
import { store, persistor } from "./store/store"
import { PersistGate } from "redux-persist/integration/react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "sonner";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Toaster richColors position="top-center" /> 
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
