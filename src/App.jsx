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
  const [revisionRealizada, setRevisionRealizada] = useState(false);
  const [nombreIntroducido, setNombreIntroducido] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleSelectTopics = () => {
    setVistaActual('topicSelection');
  };

  const handleSelectTema = (nombreTema) => {
    const reactivosFiltrados = reactivosConExplicacion.filter(r => r.tema === nombreTema);
    const reactivosBarajados = barajarArray(reactivosFiltrados);
    const reactivosParaQuiz = reactivosBarajados.slice(0, 10);
    setQuizActual({ tema: nombreTema, reactivos: reactivosParaQuiz });
    setVistaActual('quiz');
    setRevisionRealizada(false);
  };

  const handleQuizFinish = (puntuacion, historial) => {
    setResultadoActual({ puntuacion, historial });
    setVistaActual('resultados');
  };

  const handleVerRevision = () => {
    setVistaActual('revision');
  };

  const handleVolverDeRevision = () => {
    setVistaActual('resultados');
    setRevisionRealizada(true);
  };

  const handleGoToSend = () => {
    setVistaActual('enviar');
  };
  
  const handleGoToMenu = () => {
    setVistaActual('menu');
    setNombreIntroducido(false);
  };

  const handleStart = () => {
    if (nombreAlumno.trim()) {
      setNombreIntroducido(true);
    }
  };

  const renderHeader = (title) => (
    <header className="app-header">
      <img src="/logo-jaguar.png" alt="Logo Máticas Jaguar" className="logo" />
      <h1>{title}</h1>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
    </header>
  );

  let content;

  if (vistaActual === 'quiz') {
    content = (
      <Quiz
        reactivos={quizActual.reactivos}
        onQuizFinish={handleQuizFinish}
        onGoToMenu={handleGoToMenu}
      />
    );
  }

  if (vistaActual === 'resultados') {
    content = (
      <PantallaFinal
        score={resultadoActual.puntuacion}
        total={quizActual.reactivos.length}
        onRestart={handleGoToMenu}
        onVerRevision={handleVerRevision}
        onEnviar={handleGoToSend}
        revisionRealizada={revisionRealizada}
        tema={quizActual.tema}
      />
    );
  }

  if (vistaActual === 'revision') {
    content = (
      <PantallaRevision
        historial={resultadoActual.historial}
        tema={quizActual.tema}
        onVolver={handleVolverDeRevision}
      />
    );
  }

  if (vistaActual === 'enviar') {
    content = (
      <PantallaEnviar
        nombre={nombreAlumno}
        score={resultadoActual.puntuacion}
        total={quizActual.reactivos.length}
        tema={quizActual.tema}
        onBack={() => setVistaActual('resultados')}
      />
    );
  }

  if (vistaActual === 'menu') {
    content = (
      <div className="menu-principal">
        {!nombreIntroducido ? (
          <div className="name-input-section">
            <blockquote className="motivational-quote">
              "Las matemáticas son el alfabeto con el cual Dios ha escrito el Universo".
              <footer>- Galileo Galilei</footer>
            </blockquote>
            <h2 className="input-prompt-heading">Escribe tu nombre para empezar:</h2>
            <input 
              type="text" 
              placeholder="Tu nombre aquí..." 
              className="name-input" 
              value={nombreAlumno}
              onChange={(e) => setNombreAlumno(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            />
             <button 
              onClick={handleStart}
              disabled={!nombreAlumno.trim()}
              className="start-btn"
            >
              Continuar
            </button>
          </div>
        ) : (
          <div className="main-menu-buttons">
            <h2>¡Hola, {nombreAlumno}!</h2>
            <button className="menu-btn menu-btn--multiline">
              Ejercicios
integradores de
aprendizaje
            </button>
            <button 
              onClick={handleSelectTopics} 
              className="menu-btn"
            >
              Temas a evaluar
            </button>
          </div>
        )}
      </div>
    );
  }

  if (vistaActual === 'topicSelection') {
    const temasDisponibles = [...new Set(reactivosConExplicacion.map(r => r.tema))];
    content = (
      <div className="menu-principal">
        <div className="temas-container">
          {temasDisponibles.map(nombreTema => (
            <button 
              key={nombreTema} 
              onClick={() => handleSelectTema(nombreTema)} 
              className="tema-btn"
            >
              {nombreTema}
            </button>
          ))}
        </div>
        <button onClick={handleGoToMenu} className="back-to-main-menu-btn">Volver al Menú Principal</button>
      </div>
    );
  }

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      {renderHeader(vistaActual === 'topicSelection' ? 'Selecciona un Tema' : 'I learn math')}
      {content}
    </div>
  );
}

export default App;
