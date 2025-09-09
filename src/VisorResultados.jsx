import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const VisorResultados = ({ onRegresar }) => {
  const [claveClase, setClaveClase] = useState('');
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState(null);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const handleBuscarResultados = async () => {
    if (!claveClase) {
      setError('Por favor, introduce la Clave de la Clase.');
      return;
    }
    setBuscando(true);
    setError(null);
    setResultados([]);
    setBusquedaRealizada(true);

    try {
      const resultadosRef = collection(db, 'resultados');
      const q = query(resultadosRef, where('groupKey', '==', claveClase), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setResultados(docs);

    } catch (err) {
      console.error("Error al buscar resultados: ", err);
      setError('Ocurrió un error al buscar los resultados. Inténtalo de nuevo.');
    } finally {
      setBuscando(false);
    }
  };

  const renderResultado = (res) => {
    const fecha = res.createdAt?.toDate().toLocaleString() || 'Fecha no disponible';
    return (
      <tr key={res.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="py-4 px-6">{res.studentName}</td>
        <td className="py-4 px-6">{res.type === 'quiz' ? `Evaluación: ${res.tema}` : `Integrador: ${res.ejercicioTitulo}`}</td>
        <td className="py-4 px-6 text-center">{res.type === 'quiz' ? `${res.puntuacion}/${res.total}` : 'N/A'}</td>
        <td className="py-4 px-6">{fecha}</td>
      </tr>
    );
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Visor de Resultados de la Clase</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Introduce la Clave de la Clase que generaste para ver los resultados de tus alumnos.
      </p>

      <div className="flex items-center space-x-4 mb-6">
        <input 
          type="text" 
          value={claveClase}
          onChange={e => setClaveClase(e.target.value)}
          placeholder="Introduce tu Clave de la Clase..."
          className="input-3d w-full"
        />
        <button onClick={handleBuscarResultados} className="btn-3d btn-blue" disabled={buscando}>
          {buscando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {busquedaRealizada && !buscando && (
        <div>
          {resultados.length > 0 ? (
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">Alumno</th>
                    <th scope="col" className="py-3 px-6">Actividad</th>
                    <th scope="col" className="py-3 px-6 text-center">Resultado</th>
                    <th scope="col" className="py-3 px-6">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map(renderResultado)}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No se encontraron resultados para esta clave.</p>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <button onClick={onRegresar} className="btn-3d btn-gray">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default VisorResultados;
