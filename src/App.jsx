import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import Auth from './Auth';
import Quiz from './Quiz';
import EjercicioIntegradorDetalle from './EjercicioIntegradorDetalle';
import PantallaResultadosUnificada from './PantallaResultadosUnificada';
import SeleccionEjercicioIntegrador from './SeleccionEjercicioIntegrador';
import GeneradorClave from './GeneradorClave';
import VisorResultados from './VisorResultados';
import PantallaResultadosHistoricos from './PantallaResultadosHistoricos'; // NEW IMPORT
import { reactivosConExplicacion } from './data/reactivos';
import { ejerciciosIntegradores } from './data/ejerciciosIntegradores';

function barajarArray(array) {
  let arrayCopiado = [...array];
  for (let i = arrayCopiado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopiado[i], arrayCopiado[j]] = [arrayCopiado[j], arrayCopiado[i]];
  }
  return arrayCopiado;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupKey, setGroupKey] = useState('');
  const [vistaActual, setVistaActual] = useState('menu');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [quizActual, setQuizActual] = useState({ tema: null, reactivos: [] });
  const [ejercicioActualId, setEjercicioActualId] = useState(null);
  const [unifiedResult, setUnifiedResult] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

  const handleLogout = async () => {
    await signOut(auth);
    setVistaActual('menu');
  };

  const handleGoToMenu = () => setVistaActual('menu');
  const handleGoToGenerarClave = () => setVistaActual('generarClave');
  const handleGoToVerResultados = () => setVistaActual('verResultados');
  const handleSelectTopics = () => setVistaActual('topicSelection');
  const handleSelectEjercicioIntegrador = () => setVistaActual('seleccionEjercicio');
  const handleGoToHistoricalResults = () => setVistaActual('historicalResults'); // NEW FUNCTION

  const handleEjercicioSelect = (id) => {
    setEjercicioActualId(id);
    setVistaActual('ejercicioIntegrador');
  };

  const handleSelectTema = (nombreTema) => {
    const reactivosFiltrados = reactivosConExplicacion.filter(r => r.tema === nombreTema);
    const reactivosBarajados = barajarArray(reactivosFiltrados).slice(0, 10);
    setQuizActual({ tema: nombreTema, reactivos: reactivosBarajados });
    setVistaActual('quiz');
  };

  const handleQuizFinish = async (puntuacion, historial) => {
    const resultData = {
      puntuacion,
      historial,
      total: quizActual.reactivos.length,
      tema: quizActual.tema,
      studentName: user.displayName || user.email,
      groupKey: groupKey, // Este ahora es la Clave de la Clase
      userId: user.uid,
      type: 'quiz',
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "resultados"), resultData);
    } catch (error) {
      console.error("Error al guardar el resultado del quiz: ", error);
    }

    setUnifiedResult({ type: 'quiz', data: resultData });
    setVistaActual('resultadosUnificados');
  };

  const handleSaveIntegratedExercise = async (arg1, arg2, file1, file2, audio1, audio2) => {
    const ejercicio = ejerciciosIntegradores.find(e => e.id === ejercicioActualId);
    const resultData = {
      ejercicioTitulo: ejercicio.title,
      argumentosConsigna1: arg1,
      argumentosConsigna2: arg2,
      fileUrlConsigna1: file1,
      fileUrlConsigna2: file2,
      audioUrl1: audio1,
      audioUrl2: audio2,
      studentName: user.displayName || user.email,
      groupKey: groupKey, // Este ahora es la Clave de la Clase
      userId: user.uid,
      type: 'integrador',
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "resultados"), resultData);
    } catch (error) {
      console.error("Error al guardar el ejercicio integrador: ", error);
    }

    setUnifiedResult({ type: 'integrador', data: resultData });
    setVistaActual('resultadosUnificados');
  };

  const renderHeader = (title) => (
    <header className="app-header">
      <img src="/logo-jaguar.png" alt="Logo Máticas Jaguar" className="logo" />
      <div>
        <h1>{title}</h1>
        <p className="text-center text-lg font-semibold text-gray-600 dark:text-white mb-4">Creado por: Jairo Farrera</p>
      </div>
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="btn-3d btn-gray text-xs">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</button>
        {user && <button onClick={handleLogout} className="btn-3d btn-red text-xs">Cerrar Sesión</button>}
      </div>
    </header>
  );

  const getHeaderTitle = () => {
    if (vistaActual === 'generarClave' || vistaActual === 'verResultados') return 'Portal para Maestros';
    if (!user) return 'Bienvenido a Máticas Jaguar';
    switch (vistaActual) {
      case 'topicSelection': return 'Selecciona un Tema';
      case 'quiz': return `Tema: ${quizActual.tema}`;
      case 'seleccionEjercicio': return 'Ejercicios Integradores';
      case 'ejercicioIntegrador': return 'Resolviendo Ejercicio';
      case 'resultadosUnificados': return 'Resultados de la Evaluación';
      case 'historicalResults': return 'Mis Resultados Históricos'; // NEW CASE
      default: return 'Máticas Jaguar';
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-10">Cargando...</div>;
    }

    if (vistaActual === 'generarClave') {
      return <GeneradorClave onRegresar={handleGoToMenu} />;
    }
    if (vistaActual === 'verResultados') {
      return <VisorResultados onRegresar={handleGoToMenu} />;
    }

    if (user) {
      switch (vistaActual) {
        case 'quiz':
          return <Quiz reactivos={quizActual.reactivos} onQuizFinish={handleQuizFinish} onGoToMenu={handleGoToMenu} />;
        case 'topicSelection':
          const temas = [...new Set(reactivosConExplicacion.map(r => r.tema))];
          return (
            <div className="menu-principal">
              <div className="temas-container">{temas.map(t => <button key={t} onClick={() => handleSelectTema(t)} className="btn-3d btn-blue">{t}</button>)}</div>
              <button onClick={handleGoToMenu} className="btn-3d btn-gray mt-8">Volver al Menú</button>
            </div>
          );
        case 'seleccionEjercicio':
          return <SeleccionEjercicioIntegrador onSelectEjercicio={handleEjercicioSelect} onRegresar={handleGoToMenu} />;
        case 'ejercicioIntegrador':
          return <EjercicioIntegradorDetalle ejercicioId={ejercicioActualId} onRegresar={() => setVistaActual('seleccionEjercicio')} onSave={handleSaveIntegratedExercise} user={user} groupKey={groupKey} />;
        case 'resultadosUnificados':
          return <PantallaResultadosUnificada resultType={unifiedResult.type} resultData={unifiedResult.data} onGoToMenu={handleGoToMenu} />;
        case 'historicalResults': // NEW CASE
          return <PantallaResultadosHistoricos onRegresar={handleGoToMenu} />;
        default: // menu principal logueado
          return (
            <div className="menu-principal">
              <div className="main-menu-buttons">
                <h2 className="welcome-heading dark:text-white">¡Hola, {user.displayName || user.email}!</h2>
                <p className="text-center mb-4 text-orange-500 dark:text-white">Ingresa la Clave de la Clase</p>
                <input type="text" placeholder="Clave de la Clase aquí..." className="name-input input-3d mb-6" value={groupKey} onChange={(e) => setGroupKey(e.target.value)} />
                <button onClick={handleSelectEjercicioIntegrador} className="btn-3d btn-blue w-full max-w-md">Ejercicios integradores de aprendizaje</button>
                <button onClick={handleSelectTopics} className="btn-3d btn-blue w-full max-w-md mt-4">Evaluación de Contenidos</button>
                <button onClick={handleGoToHistoricalResults} className="btn-3d btn-blue w-full max-w-md mt-4">Mis Resultados Históricos</button> // NEW BUTTON
              </div>
            </div>
          );
      }
    }

    // Pantalla de inicio para usuarios no logueados
    return (
      <div className="menu-principal">
        <Auth />
        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
          <div className="text-center space-y-2">
             <button onClick={handleGoToGenerarClave} className="text-blue-600 dark:text-blue-400 hover:underline">
              ¿Eres maestro? Genera tu clave aquí
            </button>
            <br />
            <button onClick={handleGoToVerResultados} className="text-green-600 dark:text-green-400 hover:underline">
              Ver Resultados (Maestros)
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <div 
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, padding: '20px', backgroundColor: 'red', color: 'white', fontSize: '24px', cursor: 'pointer' }}
        onClick={() => alert('¡El clic en el div de prueba funciona!')}
      >
        CLICK ME (TEST DIV)
      </div>
      {renderHeader(getHeaderTitle())}
      <main className="app-main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;