// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRMxg4QGPGkvoW0_b-vLHJUHMXDL_Sl98",
  authDomain: "referafriend-f1352.firebaseapp.com",
  projectId: "referafriend-f1352",
  storageBucket: "referafriend-f1352.appspot.com",
  messagingSenderId: "248561897228",
  appId: "1:248561897228:web:395046028357f5913e4329"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);