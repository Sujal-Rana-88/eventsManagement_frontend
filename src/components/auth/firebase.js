import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTWvH_gp25TiqEa5yTga5gEwSf2W6jP3E",
  authDomain: "eventmanagement-373fe.firebaseapp.com",
  projectId: "eventmanagement-373fe",
  storageBucket: "eventmanagement-373fe.firebasestorage.app",
  messagingSenderId: "159101716964",
  appId: "1:159101716964:web:39f9b55e94b704aef69ff1",
  measurementId: "G-9YVX156J2S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };