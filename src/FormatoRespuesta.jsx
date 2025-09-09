import React from 'react';

// Este componente toma un string y le da formato si es una fracción o número mixto.
function FormatoRespuesta({ texto }) {
  // Si no hay texto, no renderiza nada.
  if (!texto) {
    return null;
  }

  const textoString = String(texto);

  // ¡NUEVO! Revisa si la opción contiene dos números mixtos separados por "y"
  if (textoString.includes(' y ')) {
    const partes = textoString.split(' y ');
    return (
      <span className="opcion-formateada">
        <FormatoRespuesta texto={partes[0]} />
        <span>&nbsp;y&nbsp;</span>
        <FormatoRespuesta texto={partes[1]} />
      </span>
    );
  }

  // Revisa si es un número mixto (ej: "1 2/10")
  if (textoString.includes(' ') && textoString.includes('/')) {
    const partes = textoString.split(' ');
    const entero = partes[0];
    const fraccion = partes[1].split('/');
    const numerador = fraccion[0];
    const denominador = fraccion[1];

    return (
      <span className="opcion-formateada">
        <span className="entero">{entero}</span>
        <div className="fraccion">
          <span className="numerador">{numerador}</span>
          <span className="denominador">{denominador}</span>
        </div>
      </span>
    );
  }

  // Revisa si es una fracción simple (ej: "3/5")
  if (!textoString.includes(' ') && textoString.includes('/')) {
    const fraccion = textoString.split('/');
    const numerador = fraccion[0];
    const denominador = fraccion[1];

    return (
      <span className="opcion-formateada">
        <div className="fraccion">
          <span className="numerador">{numerador}</span>
          <span className="denominador">{denominador}</span>
        </div>
      </span>
    );
  }

  // Si no es fracción ni número mixto, devuelve el texto tal cual.
  return <span>{textoString}</span>;
}

export default FormatoRespuesta;