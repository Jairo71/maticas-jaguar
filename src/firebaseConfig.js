import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Tus credenciales de configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBnmn0Fklo8nuwxsUepa6WTvLCF9_Vt1CE",
  authDomain: "maticas-jaguar-app.firebaseapp.com",
  projectId: "maticas-jaguar-app",
  storageBucket: "maticas-jaguar-app.appspot.com",
  messagingSenderId: "990095109997",
  appId: "1:990095109997:web:89343d64504b57a3b73464",
  measurementId: "G-2T1DJ19CS5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que vamos a utilizar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);