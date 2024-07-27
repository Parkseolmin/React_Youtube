import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import { login, menus } from 'data/header';
import useAuthStore from 'store/useAuthStore';

export default function GoogleBtn() {
  const { user, accessToken, isAuthLoading, handleAuthAction, checkAuthState } =
    useAuthStore();
  const { youtube } = useYoutubeApi();

  const {
    data: subscriptionData,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['subscription', accessToken],
    queryFn: async ({ pageParam = '' }) => {
      console.log('로그인버튼 네트워크 통신');
      return await youtube.fetchSubscriptions(accessToken, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const unsubscribe = checkAuthState();

    return () => {
      unsubscribe();
    };
  }, [checkAuthState]);

  console.log('엑세스토큰', accessToken);

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
          <li>
            <Link to='/likeVideo'>
              <FcLike />
              Saved video
            </Link>
          </li>
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
