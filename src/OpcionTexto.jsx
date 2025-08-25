// ARCHIVO: src/OpcionTexto.jsx (¡NUEVO ARCHIVO!)

import React from 'react';

// Esta función parsea una sola parte (ej: "2/10" o "3")
const parsePart = (part, key) => {
  if (part.includes('/')) {
    const [numerador, denominador] = part.split('/');
    return (
      <div key={key} className="fraccion">
        <span className="numerador">{numerador}</span>
        <span className="denominador">{denominador}</span>
      </div>
    );
  }
  // Si no es una fracción, podría ser un número entero de un número mixto
  if (!isNaN(part)) {
    return <span key={key} className="entero">{part}</span>;
  }
  // Si es texto como 'y' o 'x =', lo devuelve tal cual
  return <span key={key}>{` ${part} `}</span>;
};

// Componente principal que maneja strings completos (ej: "2 3/4 y 3 3/10")
function OpcionTexto({ texto }) {
  const partes = texto.split(' '); // Divide el string por espacios

  return (
    <div className="opcion-formateada">
      {partes.map((parte, index) => parsePart(parte, index))}
    </div>
  );
}

export default OpcionTexto;