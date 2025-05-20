import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create noscript element for users without JavaScript
const addNoScriptFallback = () => {
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h1>JavaScript Required</h1>
      <p>This website requires JavaScript to function properly. Please enable JavaScript in your browser settings and reload the page.</p>
      <p>If you're unable to enable JavaScript, you can contact us at <a href="mailto:contact@exoape.com">contact@exoape.com</a></p>
    </div>
  `;
  document.body.appendChild(noscript);
};

// Add fallback immediately
addNoScriptFallback();

// Render app with StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);