import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'ckeditor5/ckeditor5.css';
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './states/index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>,
  </Provider>
)
