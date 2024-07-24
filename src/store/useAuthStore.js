import { create } from 'zustand';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, provider } from 'firebaseapi/firebase';

const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isAuthLoading: false,

  handleAuthAction: async () => {
    const { user } = get();
    set({ isAuthLoading: true });
    if (user) {
      // 로그아웃 로직
      const ok = window.confirm('Are you sure you want to logout?');
      if (ok) {
        try {
          await signOut(auth);
          set({ user: null, accessToken: null, isAuthLoading: false });
        } catch (error) {
          console.error(error);
          set({ isAuthLoading: false });
        }
      }
    } else {
      // 로그인 로직
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        set({ user: result.user, accessToken: token, isAuthLoading: false });
      } catch (error) {
        console.error(error);
        set({ isAuthLoading: false });
      }
    }
  },

  updateToken: async () => {
    const { user } = get();
    if (user) {
      try {
        const token = await user.getIdToken(true);
        set({ accessToken: token });
      } catch (error) {
        console.error('Error refreshing token', error);
      }
    }
  },

  checkAuthState: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user });
        get().updateToken();
      } else {
        set({ user: null, accessToken: null, isLoading: false });
      }
    });
    return unsubscribe;
  },

  startTokenRefresh: () => {
    const intervalId = setInterval(() => get().updateToken(), 50 * 60 * 1000);
    return () => clearInterval(intervalId);
  },
}));

export default useAuthStore;
