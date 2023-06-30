// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push, query, orderByChild, equalTo, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCfVkqOfkxzOehXuoUuJp0wRrFq3DZBnco",
    authDomain: "orderaphone.firebaseapp.com",
    projectId: "orderaphone",
    storageBucket: "orderaphone.appspot.com",
    messagingSenderId: "127130382614",
    appId: "1:127130382614:web:c022ca0c6684b447b86037",
    measurementId: "G-N3HVR0CCGR"
  };

export { initializeApp,getDatabase, ref, set, push, query, orderByChild, equalTo, get }
export default firebaseConfig