import React, { useState, useEffect } from 'react';

const PantallaResultadosIntegrador = ({ onRegresar, integratedExerciseResult, nombreAlumno, groupKey }) => {
  const [submissions, setSubmissions] = useState([]);

  // Effect to load submissions from localStorage on initial render
  useEffect(() => {
    try {
      const storedSubmissions = JSON.parse(localStorage.getItem('integradorSubmissions')) || [];
      setSubmissions(storedSubmissions.sort((a, b) => new Date(b.id) - new Date(a.id))); // Sort by newest first
    } catch (error) {
      console.error('Error reading submissions from localStorage:', error);
      setSubmissions([]);
    }
  }, []);

  // Effect to add a new submission and save to localStorage
  useEffect(() => {
    if (integratedExerciseResult && integratedExerciseResult.argumentosConsigna1) {
      const newSubmission = {
        id: Date.now(),
        studentName: nombreAlumno,
        group: groupKey,
        timestamp: new Date().toLocaleString(),
        argumentosConsigna1: integratedExerciseResult.argumentosConsigna1,
        argumentosConsigna2: integratedExerciseResult.argumentosConsigna2,
        fileUrlConsigna1: integratedExerciseResult.archivoAdjuntoConsigna1, // Correctly use the URL directly
        fileUrlConsigna2: integratedExerciseResult.archivoAdjuntoConsigna2, // Correctly use the URL directly
      };

      const updatedSubmissions = [newSubmission, ...submissions];
      setSubmissions(updatedSubmissions);

      try {
        localStorage.setItem('integradorSubmissions', JSON.stringify(updatedSubmissions));
      } catch (error) {
        console.error('Error saving submissions to localStorage:', error);
      }
    }
  }, [integratedExerciseResult, nombreAlumno, groupKey]);

  const isImage = (url) => {
    if (!url) return false;
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Resultados de Ejercicios Integradores</h2>

        {submissions.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">Aún no hay respuestas guardadas.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <div key={sub.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-lg dark:text-white">{sub.studentName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Grupo: {sub.group}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{sub.timestamp}</span>
                </div>
                
                {/* Consigna 1 Results */}
                <div className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-800">
                  <h4 className="font-semibold dark:text-white">Respuesta a Consigna 1:</h4>
                  {sub.argumentosConsigna1 ? (
                     <p className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{sub.argumentosConsigna1}</p>
                  ) : (
                    <p className="mt-1 text-gray-500 dark:text-gray-400 italic">No hay respuesta de texto.</p>
                  )}
                  {sub.fileUrlConsigna1 && (
                    <div className="mt-2">
                      {isImage(sub.fileUrlConsigna1) ? (
                        <img src={sub.fileUrlConsigna1} alt="Adjunto Consigna 1" className="max-w-full md:max-w-md rounded-md mt-2 shadow-lg" />
                      ) : (
                        <a
                          href={sub.fileUrlConsigna1}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          Ver/Descargar Archivo Adjunto (Consigna 1)
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Consigna 2 Results */}
                <div className="mt-4 p-2 rounded bg-gray-100 dark:bg-gray-800">
                  <h4 className="font-semibold dark:text-white">Respuesta a Consigna 2:</h4>
                  {sub.argumentosConsigna2 ? (
                    <p className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{sub.argumentosConsigna2}</p>
                  ) : (
                    <p className="mt-1 text-gray-500 dark:text-gray-400 italic">No hay respuesta de texto.</p>
                  )}
                  {sub.fileUrlConsigna2 && (
                    <div className="mt-2">
                      {isImage(sub.fileUrlConsigna2) ? (
                        <img src={sub.fileUrlConsigna2} alt="Adjunto Consigna 2" className="max-w-full md:max-w-md rounded-md mt-2 shadow-lg" />
                      ) : (
                        <a
                          href={sub.fileUrlConsigna2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          Ver/Descargar Archivo Adjunto (Consigna 2)
                        </a>
                      )}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={onRegresar}
            className="btn-3d btn-gray"
          >
            Regresar al Menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default PantallaResultadosIntegrador;