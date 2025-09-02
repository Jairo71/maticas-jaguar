// ARCHIVO: src/PantallaFinal.jsx
// INSTRUCCIÓN: REEMPLAZA TODO EL CÓDIGO CON ESTE.

import React from 'react';
import { retroalimentacionGeneral } from './data/retroalimentacionGeneral';

// Nueva función para obtener la retroalimentación
const obtenerRetroalimentacion = (tema, score, total) => {
  if (!tema || !retroalimentacionGeneral[tema]) {
    return "¡Buen trabajo! Sigue practicando para mejorar.";
  }

  const porcentaje = (score / total) * 100;
  const retroTema = retroalimentacionGeneral[tema];

  if (porcentaje >= 80) {
    return retroTema.alta;
  } else if (porcentaje >= 50) {
    return retroTema.media;
  } else {
    return retroTema.baja;
  }
};

function PantallaFinal({ score, total, onRestart, onVerRevision, onEnviar, revisionRealizada, tema }) {
  const mensajeRetro = obtenerRetroalimentacion(tema, score, total);

  return (
    <div className="final-screen-container">
      <h2 className="final-title">¡Quiz Completado!</h2>
      <p className="final-score">
        Tu puntaje final es: 
        <span className="score-highlight"> {score} de {total}</span>
      </p>
      
      {/* Contenedor para la retroalimentación */}
      <div className="retro-general-container">
        <h3>Retroalimentación del Tema: {tema}</h3>
        <p>{mensajeRetro}</p>
      </div>

      <div className="final-buttons-container">
        
        {/* === BOTÓN MODIFICADO === */}
        <button onClick={onVerRevision} className="final-button revision-button">
          <div className="button-text-multiline">
            <span>Evaluación Formativa</span>
            <span className="button-subtitle">(Ver Respuestas)</span>
          </div>
        </button>
        {/* ======================= */}
        
        <button 
          onClick={onEnviar} 
          className="final-button send-button"
          disabled={!revisionRealizada}
        >
          Enviar Resultados
        </button>
        <button onClick={onRestart} className="final-button menu-button">
          Volver al Menú Principal
        </button>
      </div>
      {!revisionRealizada && (
        <p className="revision-notice">
          Debes ver la Evaluación Formativa para poder enviar tus resultados.
        </p>
      )}
    </div>
  );
}
export default PantallaFinal;