import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const NotFound = lazy(() => import('components/contents/NotFound'));
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

export default function AppRouter() {
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
  return <RouterProvider router={router} />;
}
