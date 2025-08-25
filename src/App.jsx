// ARCHIVO: src/App.jsx
// INSTRUCCIÓN: REEMPLAZA TODO EL CÓDIGO CON ESTE.

import React, { useState } from 'react';
import Quiz from './Quiz';
import PantallaFinal from './PantallaFinal';
import PantallaRevision from './PantallaRevision';
import PantallaEnviar from './PantallaEnviar';
import { reactivosConExplicacion } from './data/reactivos';

function barajarArray(array) {
  let arrayCopiado = [...array];
  for (let i = arrayCopiado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopiado[i], arrayCopiado[j]] = [arrayCopiado[j], arrayCopiado[i]];
  }
  return arrayCopiado;
}

function App() {
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [vistaActual, setVistaActual] = useState('menu');
  const [quizActual, setQuizActual] = useState({ tema: null, reactivos: [] });
  const [resultadoActual, setResultadoActual] = useState({ puntuacion: 0, historial: [] });

  const handleSelectTema = (nombreTema) => {
    const reactivosFiltrados = reactivosConExplicacion.filter(r => r.tema === nombreTema);
    const reactivosBarajados = barajarArray(reactivosFiltrados);
    const reactivosParaQuiz = reactivosBarajados.slice(0, 10);
    setQuizActual({ tema: nombreTema, reactivos: reactivosParaQuiz });
    setVistaActual('quiz');
  };

  const handleQuizFinish = (puntuacion, historial) => {
    setResultadoActual({ puntuacion, historial });
    setVistaActual('resultados');
  };

  const handleVerRevision = () => {
    setVistaActual('revision');
  };

  const handleGoToSend = () => {
    setVistaActual('enviar');
  };
  
  const handleGoToMenu = () => {
    setVistaActual('menu');
  };

  if (vistaActual === 'quiz') {
    return (
      <div className="App">
        <Quiz
          reactivos={quizActual.reactivos}
          onQuizFinish={handleQuizFinish}
          onGoToMenu={handleGoToMenu} // ¡CAMBIO IMPORTANTE! Pasamos la función a Quiz.
        />
      </div>
    );
  }

  if (vistaActual === 'resultados') {
    return (
      <div className="App">
        <PantallaFinal
          score={resultadoActual.puntuacion}
          total={quizActual.reactivos.length}
          onRestart={handleGoToMenu}
          onVerRevision={handleVerRevision}
          onEnviar={handleGoToSend}
        />
      </div>
    );
  }

  if (vistaActual === 'revision') {
    return (
      <div className="App">
        <PantallaRevision
          historial={resultadoActual.historial}
          onBack={handleGoToMenu}
        />
      </div>
    );
  }

  if (vistaActual === 'enviar') {
    return (
      <div className="App">
        <PantallaEnviar
          nombre={nombreAlumno}
          score={resultadoActual.puntuacion}
          total={quizActual.reactivos.length}
          tema={quizActual.tema}
          onBack={() => setVistaActual('resultados')}
        />
      </div>
    );
  }

  const temasDisponibles = [...new Set(reactivosConExplicacion.map(r => r.tema))];

  return (
    <div className="App">
      <header className="app-header">
        <img src="/logo-jaguar.png" alt="Logo Máticas Jaguar" className="logo" />
        <h1>I learn math</h1>
        <p>Creado por Jairo Farrera</p>
      </header>
      
      <div className="menu-principal">
        <div className="name-container">
          <h2>Escribe tu nombre para empezar:</h2>
          <input 
            type="text" 
            placeholder="Tu nombre aquí..." 
            className="name-input" 
            value={nombreAlumno} 
            onChange={(e) => setNombreAlumno(e.target.value)} 
          />
        </div>
        <h1>Selecciona un Tema</h1>
        <div className="temas-container">
          {temasDisponibles.map(nombreTema => (
            <button 
              key={nombreTema} 
              onClick={() => handleSelectTema(nombreTema)} 
              disabled={!nombreAlumno.trim()}
              className="tema-btn"
            >
              {nombreTema}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;