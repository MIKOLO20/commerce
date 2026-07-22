import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOP3Kss6Z0jHxzuHB7BM9jH_sR7JUhWrw",
  authDomain: "my-first-e-commerce-1e208.firebaseapp.com",
  projectId: "my-first-e-commerce-1e208",
  storageBucket: "my-first-e-commerce-1e208.firebasestorage.app",
  messagingSenderId: "237078006030",
  appId: "1:237078006030:web:29da579748cf04c37c2f5f",
  measurementId: "G-HXCLTNC0WQ",
};

export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
