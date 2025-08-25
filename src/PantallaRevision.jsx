// CÓDIGO CORRECTO PARA: src/PantallaRevision.jsx

import React from 'react';

function PantallaRevision({ historial, onBack }) {
  return (
    <div className="revision-page-container">
      <h1 className="revision-title">Revisión de Respuestas</h1>
      
      <div className="revision-list">
        {historial.map((item, index) => {
          const { preguntaActual, respuestaUsuario, esCorrecta } = item;
          
          return (
            <div key={index} className="revision-item">
              {preguntaActual.imagen && (
                <img 
                  src={`/images/${preguntaActual.imagen}`} 
                  alt="Reactivo" 
                  className="revision-imagen" 
                />
              )}
              
              <p className="revision-pregunta">
                <strong>Pregunta {index + 1}:</strong> {preguntaActual.pregunta}
              </p>
              
              <div className="revision-respuestas">
                <p>Tu respuesta: 
                  <span className={esCorrecta ? 'respuesta-correcta' : 'respuesta-incorrecta'}>
                    {` ${respuestaUsuario}`}
                  </span>
                  {esCorrecta ? ' ✔️' : ' ❌'}
                </p>
                
                {!esCorrecta && (
                  <p>Respuesta correcta: 
                    <span className="respuesta-correcta">
                      {` ${preguntaActual.respuesta_correcta}`}
                    </span>
                  </p>
                )}
              </div>

              <div className="explicacion-box">
                <h4 className="explicacion-title">Explicación:</h4>
                <p className="explicacion-texto">{preguntaActual.explicacion}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button
        onClick={onBack}
        className="final-button menu-button"
      >
        Volver al Inicio
      </button>
    </div>
  );
}

export default PantallaRevision;