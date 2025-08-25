// ARCHIVO: src/Quiz.jsx
// INSTRUCCIÓN: REEMPLAZA TODO EL CÓDIGO CON ESTE.

import React, { useState } from 'react';
import OpcionTexto from './OpcionTexto';

// --- ¡NUEVO! Creamos el objeto de audio fuera del componente ---
// Esto es más eficiente porque el archivo de sonido se carga una sola vez.
// El navegador sabe buscar en la carpeta 'public' por defecto.
const respuestaSound = new Audio('/sonidito.mp3');

const Quiz = ({ reactivos, onQuizFinish, onGoToMenu }) => {
    const [indicePreguntaActual, setIndicePreguntaActual] = useState(0);
    const [respuestasUsuario, setRespuestasUsuario] = useState([]);
    const [fadingOut, setFadingOut] = useState(false);

    // --- ¡NUEVO! Función para reproducir el sonido ---
    const playSound = () => {
        // Reiniciamos el tiempo del audio por si el usuario hace clic muy rápido
        respuestaSound.currentTime = 0;
        // Reproducimos el sonido
        respuestaSound.play().catch(error => {
            // Esto evita que la app se rompa si el navegador bloquea el sonido
            console.error("Error al reproducir el sonido:", error);
        });
    };

    if (!reactivos || reactivos.length === 0) {
        return (
            <div className="quiz-container">
                <p>No se encontraron preguntas para este tema.</p>
                <button onClick={onGoToMenu} className="menu-btn-quiz">Volver al Menú</button>
            </div>
        );
    }

    const preguntaActual = reactivos[indicePreguntaActual];

    const handleSeleccionarRespuesta = (opcionSeleccionada) => {
        // --- ¡NUEVO! Llamamos a la función de sonido al principio ---
        // El sonido se reproducirá inmediatamente al hacer clic.
        playSound();

        const esCorrecta = opcionSeleccionada === preguntaActual.respuesta_correcta;
        const nuevaRespuesta = {
            preguntaActual,
            respuestaUsuario: opcionSeleccionada,
            esCorrecta
        };
        const historialActualizado = [...respuestasUsuario, nuevaRespuesta];
        setRespuestasUsuario(historialActualizado);
        setFadingOut(true);
        setTimeout(() => {
            const siguienteIndice = indicePreguntaActual + 1;
            if (siguienteIndice < reactivos.length) {
                setIndicePreguntaActual(siguienteIndice);
                setFadingOut(false);
            } else {
                const puntajeFinal = historialActualizado.filter(r => r.esCorrecta).length;
                onQuizFinish(puntajeFinal, historialActualizado);
            }
        }, 500);
    };
    
    const progreso = ((indicePreguntaActual + 1) / reactivos.length) * 100;

    return (
        <div className={`quiz-container ${fadingOut ? 'fading-out' : ''}`}>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progreso}%` }}></div>
            </div>
            <div className="quiz-header">
                <div className="pregunta-numero">
                    Pregunta {indicePreguntaActual + 1} de {reactivos.length}
                </div>
                <button onClick={onGoToMenu} className="menu-btn-quiz">Volver al Menú</button>
            </div>
            {preguntaActual.imagen && (
                <img 
                    src={`/images/${preguntaActual.imagen}`} 
                    alt={`Reactivo sobre ${preguntaActual.tema}`}
                    className="reactivo-imagen"
                />
            )}
            <h2 className="pregunta-titulo">{preguntaActual.pregunta}</h2>
            <div className="opciones-container-grid">
                {preguntaActual.opciones.map((opcion, index) => (
                    <button
                        key={index}
                        className="opcion-btn-grid"
                        onClick={() => handleSeleccionarRespuesta(opcion)}
                    >
                        <OpcionTexto texto={opcion} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;