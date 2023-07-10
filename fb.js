// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, remove, set, push, query, orderByChild, equalTo, get } from "firebase/database";
import { getStorage, uploadBytes ,ref as storageRef } from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyCfVkqOfkxzOehXuoUuJp0wRrFq3DZBnco",
    authDomain: "orderaphone.firebaseapp.com",
    databaseURL: "https://orderaphone-default-rtdb.firebaseio.com",
    projectId: "orderaphone",
    storageBucket: "orderaphone.appspot.com",
    messagingSenderId: "127130382614",
    appId: "1:127130382614:web:c022ca0c6684b447b86037",
    measurementId: "G-N3HVR0CCGR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { database,storage, uploadBytes ,storageRef, ref,  remove, set, push, query, orderByChild, equalTo, get }
