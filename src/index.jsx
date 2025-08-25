import React from 'react';
import ReactDOM from 'react-dom/client';

// Aquí es donde importas el componente principal de tu aplicación.
// Probablemente tienes un archivo llamado App.js, App.jsx o similar.
// Si no estás seguro, por ahora podemos crear uno simple.
// Vamos a asumir que tu componente principal se llama App.
import App from './App.jsx'; // Asegúrate que el archivo App.jsx o App.tsx exista en la carpeta 'src'

// Este es el código estándar para iniciar una aplicación de React con Vite
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);