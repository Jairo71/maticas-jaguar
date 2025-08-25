// ARCHIVO: src/PantallaFinal.jsx
// INSTRUCCIÓN: REEMPLAZA TODO EL CÓDIGO CON ESTE.

import React from 'react';

function PantallaFinal({ score, total, onRestart, onVerRevision, onEnviar }) {
  return (
    <div className="final-screen-container">
      <h2 className="final-title">¡Quiz Completado!</h2>
      <p className="final-score">
        Tu puntaje final es: 
        <span className="score-highlight"> {score} de {total}</span>
      </p>
      <div className="final-buttons-container">
        
        {/* === BOTÓN MODIFICADO === */}
        <button onClick={onVerRevision} className="final-button revision-button">
          <div className="button-text-multiline">
            <span>Evaluación Formativa</span>
            <span className="button-subtitle">(Retroalimentación)</span>
          </div>
        </button>
        {/* ======================= */}
        
        <button onClick={onEnviar} className="final-button send-button">
          Enviar Resultados
        </button>
        <button onClick={onRestart} className="final-button menu-button">
          Volver al Menú Principal
        </button>
      </div>
    </div>
  );
}
export default PantallaFinal;