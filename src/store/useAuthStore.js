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
  logoutTimer: null,

  startLogoutTimer: () => {
    // 기존 타이머가 있다면 클리어
    clearInterval(get().logoutTimer);

    const timerId = setInterval(() => {
      const loginTime = new Date(localStorage.getItem('loginTime'));
      const currentTime = new Date();
      const elapsedTime = (currentTime - loginTime) / 1000 / 60; // 분 단위로 계산
      if (elapsedTime >= 50) {
        get().handleAuthAction(); // 자동 로그아웃
      }
    }, 1000 * 60 * 5); // 5분마다 체크

    set({ logoutTimer: timerId });
  },

  clearLogoutTimer: () => {
    clearInterval(get().logoutTimer);
    set({ logoutTimer: null });
  },

  handleAuthAction: async () => {
    const { user, startLogoutTimer, clearLogoutTimer } = get();
    set({ isAuthLoading: true });
    if (user) {
      // 로그아웃 로직
      const ok = window.confirm('Are you sure you want to logout?');
      if (ok) {
        try {
          await signOut(auth);
          set({ user: null, accessToken: null, isAuthLoading: false });
          localStorage.removeItem('loginTime');
          localStorage.removeItem('accessToken');
          clearLogoutTimer();
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
        localStorage.setItem('loginTime', new Date().toISOString());
        localStorage.setItem('accessToken', token); // 엑세스 토큰 저장
        startLogoutTimer();
      } catch (error) {
        console.error(error);
        set({ isAuthLoading: false });
      }
    }
  },

  checkAuthState: () => {
    const { startLogoutTimer, clearLogoutTimer } = get();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = localStorage.getItem('accessToken');
        set({ user, accessToken: token });
        localStorage.setItem('loginTime', new Date().toISOString());
        startLogoutTimer();
      } else {
        set({ user: null, accessToken: null, isAuthLoading: false });
        localStorage.removeItem('loginTime');
        localStorage.removeItem('accessToken');
        clearLogoutTimer();
      }
    });
    return unsubscribe;
  },

  startTokenRefresh: () => {
    // 엑세스 토큰 갱신 부분 삭제
    return () => {}; // 빈 함수 반환
  },
}));

export default useAuthStore;
