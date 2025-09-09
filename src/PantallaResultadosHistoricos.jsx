import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import PantallaRevision from './PantallaRevision'; // Para ver el detalle de un quiz

const PantallaResultadosHistoricos = ({ onRegresar }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Para guardar el quiz seleccionado para revisión

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (user) {
        setLoading(true);
        setError(null);
        setResultados([]);
        try {
          const resultadosRef = collection(db, 'resultados');
          const q = query(resultadosRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          
          const docs = [];
          querySnapshot.forEach(doc => {
            docs.push({ id: doc.id, ...doc.data() });
          });
          setResultados(docs);

        } catch (err) {
          console.error("Error al buscar resultados históricos: ", err);
          setError('Ocurrió un error al buscar tus resultados. Inténtalo de nuevo.');
        } finally {
          setLoading(false);
        }
      }
    };

    if (!loading && user) {
      fetchResults();
    }
  }, [user, loading]);

  const handleViewQuizDetail = (quizResult) => {
    setSelectedQuiz(quizResult);
  };

  if (loading) {
    return <div className="text-center p-10 dark:text-white">Cargando tus resultados...</div>;
  }

  if (!user) {
    return <div className="text-center p-10 dark:text-white">Debes iniciar sesión para ver tus resultados históricos.</div>;
  }

  if (selectedQuiz) {
    return (
      <PantallaRevision 
        historial={selectedQuiz.historial} 
        tema={selectedQuiz.tema} 
        onVolver={() => setSelectedQuiz(null)} 
      />
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Mis Resultados Históricos</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Aquí puedes ver un historial de tus evaluaciones y ejercicios integradores.
      </p>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {resultados.length > 0 ? (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">Actividad</th>
                <th scope="col" className="py-3 px-6 text-center">Resultado</th>
                <th scope="col" className="py-3 px-6">Fecha</th>
                <th scope="col" className="py-3 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map(res => {
                const fecha = res.createdAt?.toDate().toLocaleString() || 'Fecha no disponible';
                return (
                  <tr key={res.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="py-4 px-6">{res.type === 'quiz' ? `Evaluación: ${res.tema}` : `Integrador: ${res.ejercicioTitulo}`}</td>
                    <td className="py-4 px-6 text-center">{res.type === 'quiz' ? `${res.puntuacion}/${res.total}` : 'N/A'}</td>
                    <td className="py-4 px-6">{fecha}</td>
                    <td className="py-4 px-6">
                      {res.type === 'quiz' && (
                        <button 
                          onClick={() => handleViewQuizDetail(res)} 
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Ver Detalle
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No has completado ninguna actividad aún.</p>
      )}

      <div className="mt-8 text-center">
        <button onClick={onRegresar} className="btn-3d btn-gray">
          Volver al Menú Principal
        </button>
      </div>
    </div>
  );
};

export default PantallaResultadosHistoricos;
