import React from 'react';
import { ejerciciosIntegradores } from './data/ejerciciosIntegradores';

const SeleccionEjercicioIntegrador = ({ onSelectEjercicio, onRegresar }) => {
  return (
    <div className="menu-principal">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500 dark:text-white">Selecciona un Ejercicio</h2>
      <div className="main-menu-buttons">
        {ejerciciosIntegradores.map(ejercicio => (
          <button
            key={ejercicio.id}
            onClick={() => onSelectEjercicio(ejercicio.id)}
            className="btn-3d btn-blue w-full max-w-lg whitespace-pre-line"
          >
            {ejercicio.title}
          </button>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={onRegresar}
          className="btn-3d btn-gray"
        >
          Volver al Menú Principal
        </button>
      </div>
    </div>
  );
};

export default SeleccionEjercicioIntegrador;
