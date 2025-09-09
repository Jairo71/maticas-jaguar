import React, { useState } from 'react';

const palabras = ['JAGUAR', 'TIGRE', 'PUMA', 'LEON', 'SOL', 'LUNA', 'ESTRELLA', 'COMETA'];

function generarClaveUnica() {
  const palabra = palabras[Math.floor(Math.random() * palabras.length)];
  const numero = Math.floor(Math.random() * 9000) + 1000;
  return `${palabra}-${numero}`;
}

const GeneradorClave = ({ onRegresar }) => {
  const [clave, setClave] = useState(null);

  const handleGenerarClave = () => {
    setClave(generarClaveUnica());
  };

  return (
    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Generador de Clave para Maestros</h2>
      
      {!clave ? (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Aquí puedes generar una clave única para tu clase. Deberás compartir esta clave con tus alumnos para que puedan registrar sus resultados bajo tu seguimiento.
          </p>
          <button onClick={handleGenerarClave} className="btn-3d btn-blue">
            Generar mi Clave Única
          </button>
        </>
      ) : (
        <div className="mt-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ¡Tu clave única ha sido generada! <br/>
            Anótala, guárdala en un lugar seguro y compártela con tus alumnos.
          </p>
          <div className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg">
            <p className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-widest">
              {clave}
            </p>
          </div>
          <p className="text-sm text-red-500 dark:text-red-400 mt-4">
            <strong>Importante:</strong> Si pierdes esta clave, no podrás ver los resultados de tus alumnos.
          </p>
        </div>
      )}

      <div className="mt-8">
        <button onClick={onRegresar} className="btn-3d btn-gray">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default GeneradorClave;
