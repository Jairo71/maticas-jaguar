import React, { useState, useEffect, useRef } from 'react';
import { ejerciciosIntegradores } from './data/ejerciciosIntegradores';
import { db, storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import imageCompression from 'browser-image-compression';

// Pequeño componente para renderizar el contenido dinámico
const ContentRenderer = ({ item }) => {
  switch (item.type) {
    case 'paragraph':
      return <p className="whitespace-pre-line mb-4 dark:text-gray-300">{item.content}</p>;
    case 'instruction':
      return <p className="whitespace-pre-line mb-4 dark:text-gray-200 font-semibold">{item.content}</p>;
    case 'image':
      return <img src={item.src} alt={item.alt} className="my-4 rounded-lg shadow-md max-w-full mx-auto" />;
    // ... (otros casos si los hubiera)
    default:
      return null;
  }
};

function EjercicioIntegradorDetalle({ ejercicioId, onRegresar, onSave, user, groupKey }) {
  const ejercicio = ejerciciosIntegradores.find(e => e.id === ejercicioId);

  const [archivoAdjuntoConsigna1, setArchivoAdjuntoConsigna1] = useState(null);
  const [archivoAdjuntoConsigna2, setArchivoAdjuntoConsigna2] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("Componente de detalle montado. Usuario:", user);
    setArchivoAdjuntoConsigna1(null);
    setArchivoAdjuntoConsigna2(null);
    setIsSubmitting(false);
  }, [ejercicioId, user]);

  const handleFileChangeConsigna1 = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log("Archivo seleccionado para consigna 1:", file.name);
    if (file.type.startsWith('image/')) {
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);
        console.log("Imagen comprimida para consigna 1");
        setArchivoAdjuntoConsigna1(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        setArchivoAdjuntoConsigna1(file);
      }
    } else {
      setArchivoAdjuntoConsigna1(file);
    }
  };

  const handleFileChangeConsigna2 = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log("Archivo seleccionado para consigna 2:", file.name);
    if (file.type.startsWith('image/')) {
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);
        console.log("Imagen comprimida para consigna 2");
        setArchivoAdjuntoConsigna2(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        setArchivoAdjuntoConsigna2(file);
      }
    } else {
      setArchivoAdjuntoConsigna2(file);
    }
  };

  const uploadFile = async (file, consignaName) => {
    if (!file) {
      console.log(`No hay archivo para ${consignaName}, saltando subida.`);
      return null;
    }
    if (!user || !user.uid) {
      console.error('Error Crítico: El objeto de usuario o user.uid no está disponible en uploadFile.');
      return null;
    }

    console.log(`Iniciando subida para ${consignaName}...`);
    try {
      const filePath = `uploads/${user.uid}/${Date.now()}-${file.name}`;
      const fileRef = ref(storage, filePath);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(`Subida para ${consignaName} exitosa. URL:`, downloadURL);
      return downloadURL;
    } catch (error) {
      console.error(`Error al subir archivo para ${consignaName}:`, error);
      alert(`Hubo un error al subir el archivo para ${consignaName}. Revisa la consola para más detalles.`);
      return null;
    }
  };

  const handleGuardarYEnviar = async () => {
    if (!user) {
      alert('Error: Debes iniciar sesión para poder enviar tus resultados. Por favor, regresa y vuelve a entrar.');
      return;
    }
    
    setIsSubmitting(true);
    console.log("Iniciando proceso de guardado y envío...");

    const uploadedFileUrl1 = await uploadFile(archivoAdjuntoConsigna1, 'Consigna 1');
    if (archivoAdjuntoConsigna1 && !uploadedFileUrl1) {
      console.log("La subida del archivo para Consigna 1 falló. El proceso se ha detenido.");
      setIsSubmitting(false);
      return;
    }

    let uploadedFileUrl2 = null;
    if (ejercicio.consigna2) {
      uploadedFileUrl2 = await uploadFile(archivoAdjuntoConsigna2, 'Consigna 2');
      if (archivoAdjuntoConsigna2 && !uploadedFileUrl2) {
        console.log("La subida del archivo para Consigna 2 falló. El proceso se ha detenido.");
        setIsSubmitting(false);
        return;
      }
    }

    console.log("Guardando en Firestore...");
    try {
      await addDoc(collection(db, "submissions"), {
        userId: user.uid, userEmail: user.email, userName: user.displayName || '',
        groupKey, ejercicioId: ejercicio.id, ejercicioTitle: ejercicio.title,
        fileUrlConsigna1: uploadedFileUrl1,
        fileUrlConsigna2: uploadedFileUrl2,
        createdAt: serverTimestamp()
      });
      console.log("Datos guardados en Firestore con éxito.");
    } catch (error) {
      console.error("Error al guardar en Firestore: ", error);
      alert("Hubo un error al guardar tus resultados en la base de datos.");
      setIsSubmitting(false);
      return;
    }

    // Generar y abrir WhatsApp
    const numeroMaestro = '529671391177'; // TODO: Hacer este número dinámico basado en el groupKey
    const nombreAlumno = user.displayName || user.email;
    let mensaje = `*Resultados del Ejercicio Integrador de ${nombreAlumno} (${groupKey}):*\n\n*${ejercicio.title}*\n\n`;

    mensaje += `*Consigna 1:*\n${ejercicio.consigna1}\n`;
    if (uploadedFileUrl1) {
      mensaje += `*Archivo Adjunto:* ${uploadedFileUrl1}\n\n`;
    } else {
      mensaje += `*Respuesta:* No se adjuntó archivo.\n\n`;
    }

    if (ejercicio.consigna2) {
      mensaje += `*Consigna 2:*\n${ejercicio.consigna2}\n`;
      if (uploadedFileUrl2) {
        mensaje += `*Archivo Adjunto:* ${uploadedFileUrl2}`;
      } else {
        mensaje += `*Respuesta:* No se adjuntó archivo.`;
      }
    }

    console.log("Generando enlace de WhatsApp...");
    const urlWhatsApp = `https://wa.me/${numeroMaestro}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');

    console.log("Proceso completado.");
    onSave(null, null, uploadedFileUrl1, uploadedFileUrl2, null, null);
    setIsSubmitting(false);
  };

  if (!ejercicio) {
    return <div className="text-center p-10">Ejercicio no encontrado.</div>;
  }

  return (
    <div className="ejercicio-integrador-container">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">{ejercicio.title}</h2>
      
      <div className="problema-container bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-6">
        {ejercicio.mainContent.map((item, index) => <ContentRenderer key={index} item={item} />)}
      </div>

      <div className="consignas-container">
        <div className="mb-8 p-4 border rounded-lg dark:border-gray-700">
          <p className="mb-2 dark:text-white"><strong>Consigna 1</strong></p>
          <p className="mb-4 dark:text-gray-300">{ejercicio.consigna1}</p>
          <p className="mb-4 dark:text-gray-300">Envía tu respuesta en una imagen.</p>
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2 dark:text-white">SUBE TU IMAGEN</h4>
            <input type="file" accept="image/*" onChange={handleFileChangeConsigna1} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 dark:file:bg-gray-600 hover:file:bg-blue-100" />
          </div>
        </div>

        {ejercicio.consigna2 && (
          <div className="p-4 border rounded-lg dark:border-gray-700">
            <p className="mb-2 dark:text-white"><strong>Consigna 2</strong></p>
            <p className="mb-4 dark:text-gray-300">{ejercicio.consigna2}</p>
            <p className="mb-4 dark:text-gray-300">Envía tu respuesta en una imagen.</p>
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2 dark:text-white">SUBE TU IMAGEN</h4>
              <input type="file" accept="image/*" onChange={handleFileChangeConsigna2} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 dark:file:bg-gray-600 hover:file:bg-blue-100" />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button onClick={onRegresar} className="btn-3d btn-gray" disabled={isSubmitting}>Volver</button>
        <button onClick={handleGuardarYEnviar} className="btn-3d btn-green" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Guardar y Enviar'}
        </button>
      </div>
    </div>
  );
}

export default EjercicioIntegradorDetalle;
