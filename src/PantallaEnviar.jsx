// ARCHIVO: src/PantallaEnviar.jsx (¡NUEVO ARCHIVO!)

import React from 'react';

function PantallaEnviar({ nombre, score, total, tema, onBack }) {
  const mensaje = `¡Hola! Soy ${nombre} y obtuve un resultado de ${score} de ${total} en el tema de ${tema}.`;
  const mensajeCodificado = encodeURIComponent(mensaje);
  const linkWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;

  return (
    <div className="final-screen-container">
      <h2 className="final-title">Enviar Resultados</h2>
      <p className="send-instructions">
        Haz clic en el botón para abrir WhatsApp y enviar tu resultado a tu maestro.
      </p>
      <div className="resultado-preview">
        <p><strong>Alumno:</strong> {nombre}</p>
        <p><strong>Tema:</strong> {tema}</p>
        <p><strong>Resultado:</strong> {score} de {total}</p>
      </div>
      <a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="final-button send-button"
      >
        Enviar por WhatsApp
      </a>
      <button onClick={onBack} className="final-button menu-button">
        Volver
      </button>
    </div>
  );
}

export default PantallaEnviar;