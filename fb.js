// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref, remove, set, push, query, orderByChild, equalTo, get } from "firebase/database";
import { getFirestore, collection, addDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCfVkqOfkxzOehXuoUuJp0wRrFq3DZBnco",
    authDomain: "orderaphone.firebaseapp.com",
    projectId: "orderaphone",
    storageBucket: "orderaphone.appspot.com",
    messagingSenderId: "127130382614",
    appId: "1:127130382614:web:c022ca0c6684b447b86037",
    measurementId: "G-N3HVR0CCGR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// Firestore 컬렉션 참조
const firestore = getFirestore(app);

export { database, firestore, collection, addDoc, ref, remove, set, push, query, orderByChild, equalTo, get }
