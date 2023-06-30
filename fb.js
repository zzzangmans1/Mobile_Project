// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push, query,val, orderByChild, equalTo, get } from "firebase/database";

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

export { database, ref, set, push,val, query, orderByChild, equalTo, get }
