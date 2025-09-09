import React, { useState } from 'react';

function PantallaEnviar({ nombre, groupKey, score, total, tema, onBack }) {
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('idle'); // Reset status when a new file is chosen
    setFileUrl('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }

    setUploadStatus('uploading');
    const formData = new FormData();
    formData.append('archivo', selectedFile);

    try {
      // Use relative path for production, this will be proxied by Netlify
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en la subida del archivo');
      }

      const data = await response.json();
      setFileUrl(data.fileUrl);
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
    }
  };

  const handleSaveToSheet = async () => {
    if (selectedFile && uploadStatus !== 'success') {
        alert('Por favor, sube el archivo seleccionado antes de guardar los resultados.');
        return;
    }

    setSubmissionStatus('submitting');
    try {
      // Use relative path for production
      const response = await fetch('/api/submit-results', {
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
          adjunto: fileUrl, // Include the uploaded file URL
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

  const textoAdjunto = fileUrl ? `\n\nArchivo Adjunto: ${fileUrl}` : '\n\nNo se adjuntó archivo.';
  const mensaje = `¡Hola! Soy ${nombre} y obtuve un resultado de ${score} de ${total} en el tema de ${tema}.${textoAdjunto}`;
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

      {/* Sección para adjuntar archivo */}
      <div className="upload-section">
        <p className="send-instructions">
          Si necesitas enviar evidencia, adjunta un archivo aquí.
        </p>
        <input type="file" onChange={handleFileChange} className="file-input" />
        {selectedFile && (
          <button onClick={handleUpload} disabled={uploadStatus === 'uploading'} className="final-button upload-button">
            {uploadStatus === 'uploading' ? 'Subiendo...' : 'Subir Archivo'}
          </button>
        )}
        {uploadStatus === 'success' && <p className="status-message success-message">¡Archivo subido con éxito!</p>}
        {uploadStatus === 'error' && <p className="status-message error-message">Error al subir el archivo. Intenta de nuevo.</p>}
      </div>

      <hr style={{width: '80%', margin: '2rem auto'}} />

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