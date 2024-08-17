import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import { login, menus } from 'data/header';
import useAuthStore from 'store/useAuthStore';
import { gapi } from 'gapi-script';
import { FcProcess } from 'react-icons/fc';

export default function GoogleBtn() {
  const { user, accessToken, isAuthLoading, handleAuthAction, checkAuthState } =
    useAuthStore();
  const { youtube } = useYoutubeApi();
  const [outhtoken, setOuthtoken] = useState(accessToken);

  const fetchSubscriptions = async (token, pageParam) => {
    console.log('fetchSubscriptions 실행!!!');
    return await youtube.fetchSubscriptions(token, pageParam);
  };

  const {
    data: subscriptionData,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['subscription', outhtoken],
    queryFn: ({ pageParam = '' }) => fetchSubscriptions(outhtoken, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    enabled: !!outhtoken,
    staleTime: 1000 * 60 * 5,
  });

  const refreshToken = async () => {
    try {
      // 현재 Google 인증 인스턴스를 가져옴
      const authInstance = gapi.auth2.getAuthInstance();
      console.log('Auth instance:', authInstance);

      // 사용자가 로그인되어 있는지 확인함
      if (authInstance.isSignedIn.get()) {
        // 현재 사용자의 인증 응답을 새로 고침하고, 이를 통해 새로운 액세스 토큰 얻음
        const authResponse = await authInstance.currentUser
          .get()
          .reloadAuthResponse();
        console.log('authResponse', authResponse);
        const newToken = authResponse.access_token;
        setOuthtoken(newToken);
        console.log('New access token:', newToken);

        // 새로운 토큰을 사용하여 YouTube API 호출
        fetchSubscriptions(newToken);
      } else {
        console.log('User is not signed in');
        // gapi.auth2를 통해 사용자를 다시 로그인 시도
        await authInstance.signIn();
        // 로그인 후, 현재 사용자의 인증 응답을 가져옴
        const authResponse = await authInstance.currentUser
          .get()
          .getAuthResponse();
        const newToken = authResponse.access_token;
        setOuthtoken(newToken);
        console.log('User re-signed in, new access token:', newToken);

        // 새로운 토큰을 사용하여 YouTube API 호출
        fetchSubscriptions(newToken);
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = checkAuthState();
    setOuthtoken(accessToken);
    function initClient() {
      gapi.client
        .init({
          clientId:
            '51089441850-uhcrgmjsbg6pnccjl1v0lja7c60a1j10.apps.googleusercontent.com', // 여기에 실제 클라이언트 ID를 입력하세요
          scope: 'https://www.googleapis.com/auth/youtube.readonly',
        })
        .then(() => {
          console.log('GAPI client initialized');
        })
        .catch((error) => {
          console.error('Error initializing GAPI client:', error);
        });
    }

    gapi.load('client:auth2', initClient);

    return () => {
      unsubscribe();
    };
  }, [checkAuthState, accessToken]);

  useEffect(() => {
    function initClient() {
      gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENTID,
          scope: 'https://www.googleapis.com/auth/youtube.readonly',
        })
        .then(() => {
          console.log('GAPI client initialized');
        })
        .catch((error) => {
          console.error('Error initializing GAPI client:', error);
        });
    }

    gapi.load('client:auth2', initClient);
  }, []);

  return (
    <div>
      <ul className='menu login' role='menubar'>
        {login.map((l, index) => (
          <li key={index} role='none' tabIndex={menus.length + index + 1}>
            <Link role='menuitem' to={'/'} onClick={handleAuthAction}>
              {isAuthLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  {!user ? l.icon : <img src={user.photoURL} alt='User' />}
                  {user ? 'Logout' : 'Login'}
                </>
              )}
            </Link>
          </li>
        ))}
        {user && (
          <>
            <li>
              <Link to='/likeVideo'>
                <FcLike />
                Saved video
              </Link>
              <Link to={'/'}>
                <FcProcess />
                <span onClick={refreshToken}>Refresh</span>
              </Link>
            </li>
          </>
        )}
      </ul>

      {error && <p>Error loading subscriptions: {error.message}</p>}
      <ul className='flex flex-col gap-2 p-3 ps-6'>
        {isLoading ? (
          <p style={{ textAlign: 'center', paddingTop: '10px' }}>
            Loading subscriptions...
          </p>
        ) : (
          <>
            {subscriptionData?.pages.map((page) =>
              page.items.map((item) => (
                <li key={item.id} className=''>
                  <Link
                    className='p-1 flex gap-2 items-center'
                    to={`/channel/${item.snippet.resourceId.channelId}`}
                  >
                    <img
                      className='w-9 h-9 rounded-full'
                      src={item.snippet.thumbnails.medium.url}
                      alt={item.snippet.title}
                    />
                    <p className='line-clamp-1'>{item.snippet.title}</p>
                  </Link>
                </li>
              ))
            )}
          </>
        )}
      </ul>
      {hasNextPage && (
        <div style={{ margin: '0', padding: '10px' }} className='video__more'>
          <button
            style={{ fontSize: '14px' }}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='relative'
          >
            <div className='absolute left-14 bottom-6 text-lg'>
              <MdKeyboardArrowDown />
            </div>
            {isFetchingNextPage ? 'Loading...' : '더보기'}
          </button>
        </div>
      )}
    </div>
  );
}
