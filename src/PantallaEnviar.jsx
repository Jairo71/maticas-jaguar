import React, { useState } from 'react';

function PantallaEnviar({ nombre, groupKey, score, total, tema, onBack }) {
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleSaveToSheet = async () => {
    setSubmissionStatus('submitting');
    try {
      const response = await fetch('http://localhost:3001/submit-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group: groupKey,
          studentName: nombre,
          activity: tema,
          score: score,
          total: total,
        }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      await response.json();
      setSubmissionStatus('success');

    } catch (error) {
      console.error('Failed to submit results:', error);
      setSubmissionStatus('error');
    }
  };

  const mensaje = `¡Hola! Soy ${nombre} y obtuve un resultado de ${score} de ${total} en el tema de ${tema}.`;
  const mensajeCodificado = encodeURIComponent(mensaje);
  const linkWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;

  return (
    <div className="final-screen-container">
      <h2 className="final-title">Enviar y Guardar Resultados</h2>
      
      <div className="resultado-preview">
        <p><strong>Grupo:</strong> {groupKey}</p>
        <p><strong>Alumno:</strong> {nombre}</p>
        <p><strong>Tema:</strong> {tema}</p>
        <p><strong>Resultado:</strong> {score} de {total}</p>
      </div>

      {/* Sección para guardar en Google Sheets */}
      <div className="save-section">
        <p className="send-instructions">
          Presiona el botón para guardar tu resultado automáticamente en la lista de tu maestro.
        </p>
        
        {submissionStatus === 'idle' && (
          <button onClick={handleSaveToSheet} className="final-button save-button">
            Guardar Resultado en Hoja de Cálculo
          </button>
        )}

        {submissionStatus === 'submitting' && <p className="status-message">Guardando...</p>}
        {submissionStatus === 'success' && <p className="status-message success-message">¡Resultado guardado con éxito!</p>}
        {submissionStatus === 'error' && (
          <div className="error-container">
            <p className="status-message error-message">Hubo un error al guardar. Por favor, inténtalo de nuevo.</p>
            <button onClick={handleSaveToSheet} className="final-button save-button">
              Reintentar
            </button>
          </div>
        )}
      </div>

      <hr style={{width: '80%', margin: '2rem auto'}} />

      {/* Sección de WhatsApp existente */}
      <div className="whatsapp-section">
        <p className="send-instructions">
          O si prefieres, haz clic para abrir WhatsApp y enviar tu resultado manualmente.
        </p>
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="final-button send-button"
        >
          Enviar por WhatsApp
        </a>
      </div>

      <button onClick={onBack} className="final-button menu-button" style={{marginTop: '2rem'}}>
        Volver
      </button>
    </div>
  );
}

export default PantallaEnviar;
