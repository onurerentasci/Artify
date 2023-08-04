import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore ekle

const firebaseConfig = {
  apiKey: "AIzaSyAl5id8ZiHDMuW1YYotJU2tgbkgYqHznwg",
  authDomain: "artify-28541.firebaseapp.com",
  projectId: "artify-28541",
  storageBucket: "artify-28541.appspot.com",
  messagingSenderId: "981663469283",
  appId: "1:981663469283:web:da06d3e674a6a904a43fd6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
