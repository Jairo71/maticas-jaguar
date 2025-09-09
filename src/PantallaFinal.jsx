import React, { useState } from 'react';

function PantallaFinal({ score, total, onRestart, onVerRevision, onVerResultadosIntegrador, tema, studentName, group, revisionRealizada }) {
  const [submissionStatus, setSubmissionStatus] = useState('idle');

  const handleSaveResults = async () => {
    setSubmissionStatus('sending');
    try {
      const response = await fetch('/api/submit-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group, studentName, activity: tema, score, total }),
      });
      if (!response.ok) throw new Error('El servidor respondió con un error.');
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error al guardar los resultados:', error);
      setSubmissionStatus('error');
    }
  };

  // --- NUEVA FUNCIÓN PARA WHATSAPP ---
  const handleShareOnWhatsApp = () => {
    const mensaje = `¡Hola! Soy ${studentName} del grupo ${group} y te comparto mi resultado del quiz de Máticas Jaguar.\n\n*Tema:* ${tema}\n*Calificación:* ${score} de ${total}`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div className="final-screen-container">
      <h2 className="final-title">¡Quiz Completado!</h2>
      <p className="final-score">
        Tu puntaje final es: <span className="score-highlight">{score} de {total}</span>
      </p>
      
      <div className="final-buttons-container mt-8">
        
        <button onClick={onVerRevision} className="btn-3d btn-blue w-full max-w-sm">
          <div className="button-text-multiline">
            <span>Evaluación Formativa</span>
            <span className="button-subtitle" style={{textTransform: 'none'}}>retroalimentación</span>
          </div>
        </button>

        <button onClick={onVerResultadosIntegrador} className="btn-3d btn-green w-full max-w-sm mt-4">
          Ver Resultados (Integrador)
        </button>

        {/* Mensaje para habilitar los botones de envío */}
        {!revisionRealizada && (
          <p className="revision-notice">
            Debes ver la Evaluación Formativa para poder enviar tus resultados.
          </p>
        )}

        {/* --- NUEVO BOTÓN DE WHATSAPP ---
        Se activa solo cuando se ha realizado la revisión */}
        <button 
          onClick={handleShareOnWhatsApp}
          className="btn-3d btn-whatsapp w-full max-w-sm"
          disabled={!revisionRealizada}
        >
          Enviar por WhatsApp
        </button>

        <button 
          onClick={handleSaveResults} 
          className="btn-3d btn-green w-full max-w-sm"
          disabled={!revisionRealizada || submissionStatus === 'sending' || submissionStatus === 'success'}
        >
          {submissionStatus === 'sending' ? 'Guardando...' : (submissionStatus === 'success' ? '¡Guardado!' : 'Guardar en Hoja de Cálculo')}
        </button>

        {/* Mensajes de estado para el guardado en hoja de cálculo */}
        {submissionStatus === 'success' && <p className="status-message success">¡Resultados guardados con éxito!</p>}
        {submissionStatus === 'error' && <p className="status-message error">Error al guardar. Revisa la consola.</p>}

        <button onClick={onRestart} className="btn-3d btn-gray w-full max-w-sm mt-4">
          Volver al Menú Principal
        </button>
      </div>
    </div>
  );
}
export default PantallaFinal;
