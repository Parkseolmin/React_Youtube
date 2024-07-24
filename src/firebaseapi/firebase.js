// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAO-NqFvU48nWzVGJJcdLYm5Qe77gYL4mk',
  authDomain: 'memowebapp-e0cfc.firebaseapp.com',
  projectId: 'memowebapp-e0cfc',
  storageBucket: 'memowebapp-e0cfc.appspot.com',
  messagingSenderId: '51089441850',
  appId: '1:51089441850:web:4ae7ff8eda46204fc6a103',
  measurementId: 'G-YMQDR7HP3H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/youtube.readonly');

export const handleAuthAction = async (currentUser, setAccessToken) => {
  if (currentUser) {
    // 로그아웃 로직
    const ok = window.confirm('Are you sure you want to logout?');
    if (ok) {
      await signOut(auth).catch(console.error);
      setAccessToken(null);
    }
  } else {
    // 로그인 로직
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      setAccessToken(token);
    } catch (error) {
      console.error(error);
      setAccessToken(null);
    }
  }
};

export const googleLogout = async () => {
  const ok = window.confirm('Are you sure you want to logout?');
  if (ok) {
    signOut(auth).catch(console.error);
  }
};

export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // 사용자가 로그인한 경우
      callback(user);
    } else {
      // 사용자가 로그아웃한 경우
      callback(null);
    }
  });
};

export const refreshAccessToken = async (authUser = auth.currentUser) => {
  if (authUser) {
    try {
      const token = await authUser.getIdToken(true);
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }
  return null;
};
