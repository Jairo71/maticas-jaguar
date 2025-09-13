// src/firebaseUpload.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig'; // Asegúrate de que la ruta a tu config de Firebase sea correcta

/**
 * Sube un archivo a Firebase Storage y devuelve la URL de descarga.
 * @param {File} file El archivo a subir.
 * @param {string} userId El ID del usuario que sube el archivo.
 * @param {string} exerciseId El ID del ejercicio.
 * @returns {Promise<string>} La URL de descarga del archivo.
 */
export async function handleFileUpload(file, userId, exerciseId) {
  if (!file || !userId || !exerciseId) {
    throw new Error('Se requiere un archivo, un ID de usuario y un ID de ejercicio.');
  }

  // 1. Crear una referencia de almacenamiento única para evitar sobreescribir archivos.
  const storageRef = ref(storage, `submissions/${exerciseId}/${userId}/${Date.now()}-${file.name}`);
  
  try {
    // 2. Subir el archivo
    console.log(`Subiendo archivo a: ${storageRef.fullPath}`);
    const snapshot = await uploadBytes(storageRef, file);
    
    // 3. Obtener la URL de descarga pública
    console.log('Archivo subido con éxito. Obteniendo URL de descarga...');
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('URL de descarga obtenida:', downloadURL);
    
    // 4. Devolver la URL
    return downloadURL;
  } catch (error) {
    console.error("Error detallado en la subida del archivo:", error);
    // Error común si las reglas de seguridad no permiten la escritura.
    if (error.code === 'storage/unauthorized') {
      throw new Error('No tienes permiso para subir archivos. Revisa las reglas de seguridad de Firebase Storage.');
    }
    throw new Error(`Error al subir el archivo: ${error.message || 'Ocurrió un error desconocido.'}`);
  }
}
