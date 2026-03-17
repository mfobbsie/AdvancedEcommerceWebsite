import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDIWOcPp-7NLdyMyR4bD5-97BsX6KGT450",
  authDomain: "stitch-and-spark-website.firebaseapp.com",
  projectId: "stitch-and-spark-website",
  storageBucket: "stitch-and-spark-website.appspot.com",
  messagingSenderId: "387607640537",
  appId: "1:387607640537:web:23fcae49a8b922f82f01c8",
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export const storage = getStorage(app);

export { app, auth, db };