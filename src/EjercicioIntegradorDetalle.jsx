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
    setArchivoAdjuntoConsigna1(null);
    setArchivoAdjuntoConsigna2(null);
    setIsSubmitting(false);
  }, [ejercicioId]);

  const handleFileChangeConsigna1 = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      try {
        const options = {
          maxSizeMB: 1,           // (max file size in MB)
          maxWidthOrHeight: 1920, // (max width or height)
          useWebWorker: true      // (use web worker for compression)
        };
        const compressedFile = await imageCompression(file, options);
        setArchivoAdjuntoConsigna1(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        setArchivoAdjuntoConsigna1(file); // Fallback to original file if compression fails
      }
    } else {
      setArchivoAdjuntoConsigna1(file);
    }
  };
  const handleFileChangeConsigna2 = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(file, options);
        setArchivoAdjuntoConsigna2(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        setArchivoAdjuntoConsigna2(file); // Fallback to original file if compression fails
      }
    } else {
      setArchivoAdjuntoConsigna2(file);
    }
  };

  

  const uploadFile = async (file, defaultName) => {
    if (!file || !user) return null;
    let fileToUpload = file;
    if (typeof file === 'string' && file.startsWith('blob:')) {
      const blob = await fetch(file).then(res => res.blob());
      fileToUpload = new File([blob], defaultName, { type: blob.type });
    }
    if (!(fileToUpload instanceof File)) return null;
    try {
      const filePath = `uploads/${user.uid}/${Date.now()}-${fileToUpload.name}`;
      const fileRef = ref(storage, filePath);
      const snapshot = await uploadBytes(fileRef, fileToUpload);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Error al subir archivo:', error);
      return null;
    }
  };

  const handleGuardarYEnviar = async () => {
    if (!user) return alert('Debes iniciar sesión para poder enviar.');
    setIsSubmitting(true);

    const uploadedFileUrl1 = await uploadFile(archivoAdjuntoConsigna1, 'adjunto_1');
    const uploadedFileUrl2 = ejercicio.consigna2 ? await uploadFile(archivoAdjuntoConsigna2, 'adjunto_2') : null;

    try {
      await addDoc(collection(db, "submissions"), {
        userId: user.uid, userEmail: user.email, userName: user.displayName || '',
        groupKey, ejercicioId: ejercicio.id, ejercicioTitle: ejercicio.title,
        fileUrlConsigna1: uploadedFileUrl1, fileUrlConsigna2: uploadedFileUrl2,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error al guardar en Firestore: ", error);
      setIsSubmitting(false);
      return;
    }

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