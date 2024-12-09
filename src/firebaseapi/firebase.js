// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_YOUTUBE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
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
