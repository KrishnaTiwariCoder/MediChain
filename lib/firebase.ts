import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi8D-vnuLj0ENZouEfeSH5n8eNlzruf7c",
  authDomain: "medichain-f30ae.firebaseapp.com",
  projectId: "medichain-f30ae",
  storageBucket: "medichain-f30ae.firebasestorage.app",
  messagingSenderId: "288910075583",
  appId: "1:288910075583:web:5448ef0a90c8409d21480a",
  measurementId: "G-GS2HBP6K1F",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const db = getFirestore(app);
