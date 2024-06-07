import Loading from 'components/contents/Loading';
import Movies from 'pages/Movies';
import PlayList from 'pages/PlayList';
import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const NotFound = lazy(() => import('components/contents/NotFound'));
const Main = lazy(() => import('components/section/Main'));
const Channel = lazy(() => import('pages/Channel'));
const Home = lazy(() => import('pages/Home'));
const Live = lazy(() => import('pages/Live'));
const Search = lazy(() => import('pages/Search'));
const Streamers = lazy(() => import('pages/Streamers'));
const Today = lazy(() => import('pages/Today'));
const VideoDetail = lazy(() => import('pages/VideoDetail'));
const MovieDetail = lazy(() => import('pages/MovieDetail'));

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
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}
