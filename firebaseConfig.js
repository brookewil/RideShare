import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyD_UksSIdztbkqQWc4QtcIN46jDlagJJKI",
  
    authDomain: "rideshare-a7a3a.firebaseapp.com",
  
    projectId: "rideshare-a7a3a",
  
    storageBucket: "rideshare-a7a3a.firebasestorage.app",
  
    messagingSenderId: "42432420987",
  
    appId: "1:42432420987:web:610e64919f6154fabe56de",
  
    measurementId: "G-TQQ4SXVLX7"
  
  };
  

  const app = initializeApp(firebaseConfig);

  // New way: initialize Auth with persistence
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  
  const db = getFirestore(app);
  
  export { auth, db };
  