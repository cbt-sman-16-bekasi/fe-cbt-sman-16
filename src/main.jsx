import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './states/index.js'
import { BrowserRouter } from 'react-router';
import { LoadingProvider } from "./components/common/LoadingProvider.jsx";
import LoadingOverlay from "./components/common/LoadingOverlay.jsx";
import { ModalProvider } from "./components/common/ModalContext.jsx";
import ModalPopUp from "./components/common/ModalPopUp.jsx";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <LoadingProvider>
          <ModalProvider>
            <App />
            <ModalPopUp />
            <LoadingOverlay />
          </ModalProvider>
        </LoadingProvider>
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
