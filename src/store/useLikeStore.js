// useLikeStore.js
import { create } from 'zustand';
import { db } from 'firebaseapi/firebase';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const useLikeStore = create((set, get) => ({
  likedVideos: {},
  isLoading: false,

  // 특정 사용자가 특정 동영상을 좋아요버튼 눌렀는지 확인 및 기억 메서드
  checkLikeStatus: async (userId, videoId) => {
    if (!userId) return false;
    // userId가 없으면 false를 반화하고 종료
    const likeRef = doc(db, 'likes', `${userId}_${videoId}`);
    // Firebase에서 해당 사용자가 해당 동영상에 좋아요를 눌렀는지 확인하기 위해 문서 참조를 생성
    const likeDoc = await getDoc(likeRef);
    // 해당 문서의 데이터를 가져옴
    const isLiked = likeDoc.exists();
    // 문서가 존재하면 isLiked는 true, 존재하지 않으면 false 반환
    set((state) => ({
      likedVideos: { ...state.likedVideos, [videoId]: isLiked },
    }));
    // likevideos 상태를 업데이트하여 해당 동영상의 좋아요 상태를 저장
    return isLiked;
    // 좋아요 상태를 반환
  },

  // 동영상의 좋아요 상태를 토글함
  toggleLike: async (userId, videoId, videoInfo) => {
    if (!userId) return;
    // userId가 없으면 아무 작업도 하지 않음.
    set({ isLoading: true });
    // isLoading 상태를 true로 설정하여 로딩 중임을 나타냄.
    const likeRef = doc(db, 'likes', `${userId}_${videoId}`);
    // Firestore에서 해당 사용자가 해당 동영상에 좋아요를 눌렀는지 확인하기 위해 문서 참조를 생성.
    const currentLikeStatus = get().likedVideos[videoId];
    // 현재 likedVideos 상태에서 해당 동영상의 좋아요 상태를 가져옴.

    if (currentLikeStatus) {
      await deleteDoc(likeRef);
      // 이미 좋아요 상태라면 Firestore에서 해당 문서를 삭제하여 좋아요를 취소.
    } else {
      await setDoc(likeRef, {
        userId,
        videoId,
        videoInfo,
      });
      // 좋아요 상태가 아니라면 Firestore에 새 문서를 생성하여 좋아요를 설정.
    }

    set((state) => ({
      likedVideos: { ...state.likedVideos, [videoId]: !currentLikeStatus },
      isLoading: false,
    }));
    // likedVideos 상태를 업데이트하여 해당 동영상의 좋아요 상태를 토글.
    // isLoading 상태를 false로 설정.
  },

  // 좋아요 누른 모든 동영상을 가져옴
  fetchLikedVideos: async (userId) => {
    if (!userId) return;
    // userId가 없으면 아무 작업도 하지 않음.
    set({ isLoading: true });
    // isLoading 상태를 true로 설정하여 로딩 중임을 나타냄.
    const likesRef = collection(db, 'likes');
    // Firestore에서 'likes' 컬렉션 참조를 생성.
    const q = query(likesRef, where('userId', '==', userId));
    // 해당 사용자가 좋아요 한 동영상들을 조회하기 위해 쿼리를 생성.
    const querySnapshot = await getDocs(q);
    // 쿼리 결과를 가져옴.
    const videos = querySnapshot.docs.map((doc) => doc.data().videoInfo);
    // 쿼리 결과에서 각 문서의 videoInfo를 추출하여 동영상 목록을 만듬.
    const likedVideosMap = videos.reduce((acc, video) => {
      acc[video.id] = true;
      return acc;
    }, {});
    // 동영상 목록을 순회하여 likedVideos 맵을 생성. 각 동영상의 ID를 키로 하고 값을 true로 설정.
    set({ likedVideos: likedVideosMap, isLoading: false });
    // likedVideos 상태를 업데이트하고 isLoading 상태를 false로 설정.
    return videos;
    // 동영상 목록을 반환.
  },
}));

export default useLikeStore;
