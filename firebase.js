import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB31lMKS0TmDsxNmd5WlxkTE5plBgdY-Qg",
  authDomain: "toureandtravel-2357c.firebaseapp.com",
  projectId: "toureandtravel-2357c",
  storageBucket: "toureandtravel-2357c.appspot.com",
  messagingSenderId: "62446322891",
  appId: "1:62446322891:web:4847450de0addfe0ec074e",
  measurementId: "G-LZG1TELM30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)