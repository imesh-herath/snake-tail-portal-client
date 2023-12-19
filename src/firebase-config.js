import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA6Fs24u38fWO0XFA3elkAznZAfbuKra-s",
    authDomain: "snake-tail-ce67c.firebaseapp.com",
    databaseURL: "https://snake-tail-ce67c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "snake-tail-ce67c",
    storageBucket: "snake-tail-ce67c.appspot.com",
    messagingSenderId: "710658290601",
    appId: "1:710658290601:web:9447c3cb065c668e444ab8",
    measurementId: "G-C1G2NXN20C"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);