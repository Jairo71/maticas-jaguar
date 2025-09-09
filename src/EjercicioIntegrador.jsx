import React, { useState } from 'react';

const EjercicioIntegrador = ({ onRegresar, nombreAlumno, groupKey }) => {
  const [texto, setTexto] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setArchivo(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!texto && !archivo) {
      alert('Por favor, escribe una respuesta o adjunta un archivo.');
      return;
    }

    setLoading(true);
    let archivoUrl = '';

    if (archivo) {
      const formData = new FormData();
      formData.append('archivo', archivo);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          archivoUrl = data.fileUrl;
        } else {
          throw new Error(data.message || 'Error al subir el archivo.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`Hubo un error al subir el archivo: ${error.message}`);
        setLoading(false);
        return;
      }
    }

    const submission = {
      id: new Date().toISOString(),
      studentName: nombreAlumno,
      group: groupKey,
      text: texto,
      fileUrl: archivoUrl,
      timestamp: new Date().toLocaleString('es-MX'),
    };

    try {
      const existingSubmissions = JSON.parse(localStorage.getItem('integradorSubmissions')) || [];
      localStorage.setItem('integradorSubmissions', JSON.stringify([...existingSubmissions, submission]));
      alert('¡Respuesta enviada y guardada localmente!');
    } catch (error) {
      console.error('Error saving submission to localStorage:', error);
      alert('Hubo un error al guardar la respuesta localmente.');
    }

    // IMPORTANTE: Reemplazar con el número de teléfono real del maestro, incluyendo el código de país.
    const numeroMaestro = '521XXXXXXXXXX';
    let mensaje = `*Respuesta del Ejercicio Integrador de ${nombreAlumno} (${groupKey}):*

`;
    if (texto) {
      mensaje += `${texto}

`;
    }
    if (archivoUrl) {
      mensaje += `*Archivo Adjunto:*
${archivoUrl}`;
    }

    const urlWhatsApp = `https://wa.me/${numeroMaestro}?text=${encodeURIComponent(mensaje)}`;

    window.open(urlWhatsApp, '_blank');
    setLoading(false);
    onRegresar();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">Ejercicio Integrador</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Responde a la consigna planteada. Puedes escribir tu argumento y/o adjuntar un archivo (imagen o PDF) con tu desarrollo.
        </p>
        <div className="problem-statement text-gray-700 dark:text-gray-200 mb-6">
          <h3 className="text-2xl font-semibold mb-3">Ejercicio 1 ¡Hasta que la dignidad se haga costumbre!</h3>
          <p className="mb-4">
            El grupo de 6°A de la Escuela General Lázaro Cárdenas, de San Pedro Cholula, realizó el proyecto escolar “Violencia de género: un problema social que nos afecta”. Consideraron importante organizar una asamblea entre sus compañeras, compañeros, madres y padres de familia de los grupos de 4°, 5° y 6°, con la intención de establecer acuerdos de convivencia para evitar los diversos tipos de violencia que suelen presentarse contra las mujeres. Como parte de sus actividades, realizaron una lista de los casos de violencia que se presentan con más frecuencia en su comunidad. Con la información obtenida realizaron una encuesta a 600 mujeres y niñas sobre la violencia que habían enfrentado, y se registraron los datos en la siguiente tabla.
          </p>
          <h4 className="text-xl font-semibold mb-3">Tipos de violencia que suelen afectar la dignidad y derechos de las niñas y mujeres de la comunidad</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b"></th>
                  <th className="py-2 px-4 border-b">Tipos de violencia</th>
                  <th className="py-2 px-4 border-b">Casos</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">1</td><td className="py-2 px-4 border-b">Bromas hirientes</td><td className="py-2 px-4 border-b">56</td></tr>
                <tr><td className="py-2 px-4 border-b">2</td><td className="py-2 px-4 border-b">Descalificar</td><td className="py-2 px-4 border-b">54</td></tr>
                <tr><td className="py-2 px-4 border-b">3</td><td className="py-2 px-4 border-b">Ridiculizar y ofender</td><td className="py-2 px-4 border-b">68</td></tr>
                <tr><td className="py-2 px-4 border-b">4</td><td className="py-2 px-4 border-b">Forzar a una relación sentimental</td><td className="py-2 px-4 border-b">69</td></tr>
                <tr><td className="py-2 px-4 border-b">5</td><td className="py-2 px-4 border-b">Humillar en público</td><td className="py-2 px-4 border-b">59</td></tr>
                <tr><td className="py-2 px-4 border-b">6</td><td className="py-2 px-4 border-b">Celar las amistades o relaciones</td><td className="py-2 px-4 border-b">51</td></tr>
                <tr><td className="py-2 px-4 border-b">7</td><td className="py-2 px-4 border-b">Acosar en redes sociales</td><td className="py-2 px-4 border-b">55</td></tr>
                <tr><td className="py-2 px-4 border-b">8</td><td className="py-2 px-4 border-b">Golpear intencionalmente</td><td className="py-2 px-4 border-b">69</td></tr>
                <tr><td className="py-2 px-4 border-b">9</td><td className="py-2 px-4 border-b">Ignorar o la ley del hielo</td><td className="py-2 px-4 border-b">50</td></tr>
                <tr><td className="py-2 px-4 border-b">10</td><td className="py-2 px-4 border-b">Tocamientos indebidos en el cuerpo</td><td className="py-2 px-4 border-b">69</td></tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-2xl font-semibold mb-3">Consigna 1</h3>
          <p className="mb-4">Haz una gráfica de barras con la información de la tabla</p>
          <h3 className="text-2xl font-semibold mb-3">Consigna 2</h3>
          <p className="mb-4">Observa los datos de la tabla y la gráfica que elaboraste, ¿cuáles son los tipos de violencia que representan la moda? Escribe cómo lograste identificarla.</p>
        </div>

        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Escribe tus argumentos aquí..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Adjuntar archivo (opcional):
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  <span>Sube un archivo</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,application/pdf" />
                </label>
                <p className="pl-1">o arrástralo aquí</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, PDF</p>
              {archivo && <p className="text-sm text-green-600 dark:text-green-400 mt-2">Archivo seleccionado: {archivo.name}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
            <button
                onClick={onRegresar}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
                Regresar
            </button>
            <button
                onClick={handleSubmit}
                disabled={loading || (!texto && !archivo)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-600"
            >
                {loading ? 'Procesando...' : 'Generar y Enviar'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default EjercicioIntegrador;
