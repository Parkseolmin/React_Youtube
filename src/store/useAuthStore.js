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
  loginMethod: getLocalStorage('loginMethod'),

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

  Tokenlogin: async () => {
    const { startLogoutTimer } = get();
    set({ isAuthLoading: true });
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      set({ user: result.user, accessToken: token });
      setLocalStorage('loginTime', new Date().toISOString());
      setLocalStorage('accessToken', token);
      startLogoutTimer();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      set({ isAuthLoading: false });
    }
  },

  login: async () => {
    set({ isAuthLoading: true });
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      set({ user: result.user });
      setLocalStorage('loginTime', new Date().toISOString());
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      set({ isAuthLoading: false });
    }
  },

  Tokenlogout: async () => {
    const { clearLogoutTimer } = get();
    try {
      await signOut(auth);
      set({ user: null, accessToken: null, loginMethod: null });
      removeLocalStorage('loginTime');
      removeLocalStorage('accessToken');
      removeLocalStorage('loginMethod');
      clearLogoutTimer();
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, loginMethod: null });
      removeLocalStorage('loginTime');
      removeLocalStorage('loginMethod');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  handleAuthAction: async () => {
    const { user, Tokenlogin, Tokenlogout } = get();
    try {
      set({ isAuthLoading: true });
      if (user) {
        const ok = window.confirm('Are you sure you want to logout?');
        if (ok) await Tokenlogout();
      } else {
        set({ loginMethod: 'google' });
        setLocalStorage('loginMethod', 'google');
        await Tokenlogin();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      set({ isAuthLoading: false });
    }
  },

  generalAuthAction: async () => {
    const { user, login, logout } = get();
    try {
      set({ isAuthLoading: true });
      if (user) {
        const ok = window.confirm('Are you sure you want to logout?');
        if (ok) await logout();
      } else {
        set({ loginMethod: 'general' });
        setLocalStorage('loginMethod', 'general');
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
    set({ isAuthLoading: true });
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = getLocalStorage('accessToken');
        set({ user, accessToken: token });
        setLocalStorage('loginTime', new Date().toISOString());
        startLogoutTimer();
      } else {
        set({ user: null, accessToken: null, loginMethod: null });
        removeLocalStorage('loginTime');
        removeLocalStorage('accessToken');
        clearLogoutTimer();
      }
      set({ isAuthLoading: false });
    });
  },
}));

export default useAuthStore;
