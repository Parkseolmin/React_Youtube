import { create } from 'zustand';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, provider } from 'firebaseapi/firebase';

const LOGOUT_TIME_LIMIT = 50; // 분
const CHECK_INTERVAL = 5 * 60 * 1000; // 5분

const setLocalStorage = (key, value) => localStorage.setItem(key, value);
const removeLocalStorage = (key) => localStorage.removeItem(key);
const getLocalStorage = (key) => localStorage.getItem(key);

const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isAuthLoading: false,
  logoutTimer: null,

  startLogoutTimer: () => {
    const { clearLogoutTimer, handleAuthAction } = get();
    clearLogoutTimer();
    const timerId = setInterval(() => {
      const loginTime = new Date(getLocalStorage('loginTime'));
      const elapsedTime = (new Date() - loginTime) / (1000 * 60);
      if (elapsedTime >= LOGOUT_TIME_LIMIT) {
        handleAuthAction();
      }
    }, CHECK_INTERVAL);
    set({ logoutTimer: timerId });
  },

  clearLogoutTimer: () => {
    clearInterval(get().logoutTimer);
    set({ logoutTimer: null });
  },

  login: async () => {
    const { startLogoutTimer } = get();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log('token', token);
      set({ user: result.user, accessToken: token });
      setLocalStorage('loginTime', new Date().toISOString());
      setLocalStorage('accessToken', token);
      startLogoutTimer();
    } catch (error) {
      console.error('Login error:', error);
    }
  },

  logout: async () => {
    const { clearLogoutTimer } = get();
    try {
      await signOut(auth);
      set({ user: null, accessToken: null });
      removeLocalStorage('loginTime');
      removeLocalStorage('accessToken');
      clearLogoutTimer();
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  handleAuthAction: async () => {
    const { user, login, logout } = get();
    try {
      set({ isAuthLoading: true });
      if (user) {
        const ok = window.confirm('Are you sure you want to logout?');
        if (ok) await logout();
      } else {
        await login();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      set({ isAuthLoading: false });
    }
  },

  checkAuthState: () => {
    const { startLogoutTimer, clearLogoutTimer } = get();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = getLocalStorage('accessToken');
        set({ user, accessToken: token });
        setLocalStorage('loginTime', new Date().toISOString());
        startLogoutTimer();
      } else {
        set({ user: null, accessToken: null });
        removeLocalStorage('loginTime');
        removeLocalStorage('accessToken');
        clearLogoutTimer();
      }
    });
  },
}));

export default useAuthStore;
