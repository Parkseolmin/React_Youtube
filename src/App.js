import { auth } from 'firebaseapi/firebase';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const NotFound = lazy(() => import('components/contents/NotFound'));
const Loading = lazy(() => import('components/contents/Loading'));
const Main = lazy(() => import('components/section/Main'));
const Channel = lazy(() => import('pages/Channel'));
const Home = lazy(() => import('pages/Home'));
const Live = lazy(() => import('pages/Live'));
const Search = lazy(() => import('pages/Search'));
const Streamers = lazy(() => import('pages/Streamers'));
const Today = lazy(() => import('pages/Today'));
const VideoDetail = lazy(() => import('pages/VideoDetail'));
const Movies = lazy(() => import('pages/Movies'));
const PlayList = lazy(() => import('pages/PlayList'));
const MovieDetail = lazy(() => import('pages/MovieDetail'));
const LikeVideo = lazy(() => import('pages/LikeVideo'));

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <NotFound />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/today', element: <Today /> },
        { path: '/streamer', element: <Streamers /> },
        { path: '/live', element: <Live /> },
        { path: '/movies', element: <Movies /> },
        { path: '/movies/:listId', element: <MovieDetail /> },
        { path: '/playlist', element: <PlayList /> },
        { path: '/channel/:channelId', element: <Channel /> },
        { path: '/video/:videoId', element: <VideoDetail /> },
        { path: '/search/:searchId', element: <Search /> },
        { path: '/likeVideo', element: <LikeVideo /> },
      ],
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      await auth.authStateReady();
      if (isMounted) {
        setIsLoading(false);
      }
    };
    init();

    return () => (isMounted = false);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </Suspense>
  );
}
