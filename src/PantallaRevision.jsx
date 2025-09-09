import React, { useEffect, useRef } from 'react';
import { retroalimentacionPorTema } from './data/retroalimentacion';
import FormatoRespuesta from './FormatoRespuesta';

function PantallaRevision({ historial, tema, onVolver }) {
  const respuestasIncorrectas = historial.filter(item => !item.esCorrecta);
  const audioRef = useRef(null);

  useEffect(() => {
    if (respuestasIncorrectas.length === 0 && audioRef.current) {
      audioRef.current.play().catch(e => console.log("La reproducción automática fue bloqueada por el navegador."));
    }
  }, [respuestasIncorrectas.length]);

  const obtenerMensajeDeAnimo = () => {
    const puntaje = historial.length - respuestasIncorrectas.length;
    const total = historial.length;
    const porcentaje = (puntaje / total) * 100;

    if (porcentaje >= 90) {
      return "¡Garra de Jaguar! Estás a un paso de la perfección. ¡Sigue así y dominarás la selva del conocimiento!";
    } else if (porcentaje >= 70) {
      return "¡Con la fuerza de un Jaguar! Has demostrado un gran progreso. Analiza estos puntos y tu próximo intento será impecable.";
    } else if (porcentaje >= 50) {
      return "¡No te rindas, joven Jaguar! Cada error es una lección. Estás construyendo tu camino hacia la maestría.";
    } else {
      return "¡El camino del Jaguar empieza con un solo paso! Revisa estos conceptos, son la base para tu crecimiento. ¡Tú puedes!";
    }
  };

  const retroalimentacionEspecifica = retroalimentacionPorTema[tema] || [];

  const encontrarRetroalimentacion = (idPregunta) => {
    const retro = retroalimentacionEspecifica.find(r => r.id === idPregunta);
    return retro ? retro.texto : '<p>No hay una explicación detallada disponible para este reactivo.</p>';
  };

  if (respuestasIncorrectas.length === 0) {
    return (
      <div className="ejercicio-integrador-container all-correct-container">
        <audio ref={audioRef} src="/urra.mp3" preload="auto" />
        <img src="/logo-jaguar.png" alt="Felicitaciones" className="felicitaciones-jaguar" />
        <h1 className="revision-title">¡Felicidades, eres un Maestro Jaguar!</h1>
        <p className="felicitaciones-texto">¡Has respondido correctamente a todas las preguntas!</p>
        <p className="felicitaciones-texto">Tu dedicación y agilidad mental son impresionantes. ¡Ningún desafío es demasiado grande para ti!</p>
        <div className="flex space-x-4 mt-8">
          <button onClick={onVolver} className="btn-3d btn-gray">
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ejercicio-integrador-container">
      <h1 className="revision-title">¡Afila tus garras, Jaguar!</h1>
      <p className="revision-subtitle">{obtenerMensajeDeAnimo()}</p>
      <p className="revision-subtitle">Aquí tienes la retroalimentación de los reactivos a mejorar:</p>
      
      <div className="revision-list">
        {respuestasIncorrectas.map((item, index) => {
          const { preguntaActual, respuestaUsuario } = item;
          const retroTexto = encontrarRetroalimentacion(preguntaActual.id);

          return (
            <div key={index} className="revision-item">
              {preguntaActual.imagen && (
                <img 
                  src={`/images/${preguntaActual.imagen}`} 
                  alt="Reactivo" 
                  className="reactivo-imagen" 
                />
              )}
              <p className="revision-pregunta">
                <strong>Pregunta:</strong> {preguntaActual.pregunta}
              </p>
              <div className="revision-respuestas">
                <p>Tu respuesta: 
                  <span className='respuesta-incorrecta'>
                    <FormatoRespuesta texto={respuestaUsuario} />
                  </span>
                  {' ❌'}
                </p>
                <p>Respuesta correcta: 
                  <span className="respuesta-correcta">
                    <FormatoRespuesta texto={preguntaActual.respuesta_correcta} />
                  </span>
                </p>
              </div>
              <div 
                className="explicacion-box"
                dangerouslySetInnerHTML={{ __html: retroTexto }}
              />
            </div>
          );
        })}
      </div>
      
      <div className="flex space-x-4 mt-8">
        <button onClick={onVolver} className="btn-3d btn-gray">
          Volver
        </button>
      </div>
    </div>
  );
}

export default PantallaRevision;