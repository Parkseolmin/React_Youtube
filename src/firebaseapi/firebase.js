// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyAO-NqFvU48nWzVGJJcdLYm5Qe77gYL4mk',
  authDomain: 'memowebapp-e0cfc.firebaseapp.com',
  projectId: 'memowebapp-e0cfc',
  storageBucket: 'memowebapp-e0cfc.appspot.com',
  messagingSenderId: '51089441850',
  appId: '1:51089441850:web:4ae7ff8eda46204fc6a103',
  measurementId: 'G-YMQDR7HP3H',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
// provider.setCustomParameters({
//   prompt: 'select_account',
// });
