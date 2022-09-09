import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGrSARJDFYO7cBExtmtY9AmWeWVAEy11k",
  authDomain: "techno-furniture-ecommerce-app.firebaseapp.com",
  projectId: "techno-furniture-ecommerce-app",
  storageBucket: "techno-furniture-ecommerce-app.appspot.com",
  messagingSenderId: "619296725185",
  appId: "1:619296725185:web:af87c25f9ebc9ebb99dc40",
  measurementId: "G-ET59V9647J",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);
