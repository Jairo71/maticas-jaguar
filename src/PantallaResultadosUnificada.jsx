import React, { useState } from 'react';
import PantallaRevision from './PantallaRevision'; // Reutilizaremos la vista de revisión para los quizes

// Un componente interno para mostrar los resultados del ejercicio integrador
const RevisionIntegrador = ({ resultData }) => (
  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <h3 className="text-xl font-bold mb-4 dark:text-white">Revisión del Ejercicio Integrador</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold dark:text-gray-200">Respuesta a Consigna 1:</h4>
        <p className="mt-1 text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
          {resultData.argumentosConsigna1 || <i>No hay respuesta de texto.</i>}
        </p>
        {resultData.fileUrlConsigna1 && (
          <div className="mt-2">
            {/\.(jpeg|jpg|gif|png)$/i.test(resultData.fileUrlConsigna1) ? (
              <img src={resultData.fileUrlConsigna1} alt="Adjunto Consigna 1" className="max-w-full md:max-w-md rounded-md mt-2 shadow-lg" />
            ) : (
              <a href={resultData.fileUrlConsigna1} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                Ver/Descargar Archivo (Consigna 1)
              </a>
            )}
          </div>
        )}
      </div>
      <div>
        <h4 className="font-semibold dark:text-gray-200">Respuesta a Consigna 2:</h4>
        <p className="mt-1 text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
          {resultData.argumentosConsigna2 || <i>No hay respuesta de texto.</i>}
        </p>
        {resultData.fileUrlConsigna2 && (
          <div className="mt-2">
            {/\.(jpeg|jpg|gif|png)$/i.test(resultData.fileUrlConsigna2) ? (
              <img src={resultData.fileUrlConsigna2} alt="Adjunto Consigna 2" className="max-w-full md:max-w-md rounded-md mt-2 shadow-lg" />
            ) : (
              <a href={resultData.fileUrlConsigna2} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                Ver/Descargar Archivo (Consigna 2)
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

const PantallaResultadosUnificada = ({ resultData, resultType, onGoToMenu }) => {  const { studentName, groupKey } = resultData;
  const [step, setStep] = useState(1); // 1: Resumen, 2: Revisión, 3: Enviar

  const handleStep1Continue = () => {
    if (resultType === 'integrador') {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handleSendViaWhatsApp = () => {
    let reportText = `*Resultados de Máticas Jaguar*\n\n`;
    reportText += `*Alumno:* ${studentName}\n`;
    reportText += `*Grupo:* ${groupKey}\n\n`;

    if (resultType === 'quiz') {
      const percentage = Math.round((resultData.puntuacion / resultData.total) * 100);
      reportText += `*Evaluación:* ${resultData.tema}\n`;
      reportText += `*Porcentaje de Aciertos:* ${percentage}%\n`;
    } else { // Integrador
      reportText += `*Ejercicio Integrador:* ${resultData.ejercicioTitulo}\n\n`;
      
      // Detalles de la Consigna 1
      reportText += `*Consigna 1:*\n`;
      reportText += `Respuesta: ${resultData.argumentosConsigna1 || 'No se proporcionó texto.'}\n`;
      if (resultData.fileUrlConsigna1) {
        reportText += `Archivo: ${resultData.fileUrlConsigna1}\n`;
      }
      if (resultData.audioUrl1) {
        reportText += `Nota de Voz: ${resultData.audioUrl1}\n`;
      }
      reportText += `\n`;

      // Detalles de la Consigna 2 (si existe)
      if (resultData.argumentosConsigna2 || resultData.fileUrlConsigna2 || resultData.audioUrl2) {
        reportText += `*Consigna 2:*\n`;
        reportText += `Respuesta: ${resultData.argumentosConsigna2 || 'No se proporcionó texto.'}\n`;
        if (resultData.fileUrlConsigna2) {
          reportText += `Archivo: ${resultData.fileUrlConsigna2}\n`;
        }
        if (resultData.audioUrl2) {
          reportText += `Nota de Voz: ${resultData.audioUrl2}\n`;
        }
      }
    }

    const encodedText = encodeURIComponent(reportText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    onGoToMenu(); // Regresar al menú después de intentar enviar
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Resultados de la Evaluación</h2>
            {resultType === 'quiz' ? (
              <p className="text-2xl dark:text-gray-200">Tu puntuación: <span className="font-bold text-blue-500 dark:text-blue-400">{resultData.puntuacion} / {resultData.total}</span></p>
            ) : (
              <p className="text-2xl dark:text-gray-200">Has completado el Ejercicio Integrador.</p>
            )}
          </div>
        );
      case 2:
        return <PantallaRevision historial={resultData.historial} tema={resultData.tema} onVolver={() => {}} />;
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Confirmar Envío</h2>
            <p className="text-lg dark:text-gray-300 mb-6">Estás a punto de enviar tus resultados. Se abrirá WhatsApp para que elijas un contacto.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    return (
      <div className="flex flex-col items-center space-y-4 mt-8">
        {step === 1 && <button onClick={handleStep1Continue} className="btn-3d btn-blue w-full max-w-xs">Continuar con Enviar Resultados</button>}
        {step === 2 && <button onClick={() => setStep(3)} className="btn-3d btn-blue w-full max-w-xs">Continuar para Enviar Resultados</button>}
        {step === 3 && <button onClick={handleSendViaWhatsApp} className="btn-3d btn-blue w-full max-w-xs">Enviar por WhatsApp</button>}
        <button onClick={onGoToMenu} className="btn-3d btn-gray w-full max-w-xs">Volver al Menú Principal</button>
      </div>
    );
  };

  return (
    <div className="ejercicio-integrador-container">
      {renderStepContent()}
      {renderButtons()}
    </div>
  );
};

export default PantallaResultadosUnificada;