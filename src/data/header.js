import { MdLiveTv } from 'react-icons/md';
import { FcMusic, FcGoogle } from 'react-icons/fc';
import { FaHotjar, FaUserAstronaut } from 'react-icons/fa';
import { RiLiveFill } from 'react-icons/ri';
import { BiMoviePlay } from 'react-icons/bi';
import {
  AiFillGithub,
  AiOutlineCodepen,
  AiFillYoutube,
  AiOutlineInstagram,
} from 'react-icons/ai';

export const menus = [
  {
    title: 'Home',
    icon: <MdLiveTv />,
    src: '/',
  },
  {
    title: 'Hot Video',
    icon: <FaHotjar />,
    src: '/today',
  },
  {
    title: 'Live',
    icon: <RiLiveFill />,
    src: '/live',
  },
  {
    title: 'Streamer',
    icon: <FaUserAstronaut />,
    src: '/streamer',
  },
  {
    title: 'Movies',
    icon: <BiMoviePlay />,
    src: '/movies',
  },
  {
    title: 'Playlist',
    icon: <FcMusic />,
    src: '/playlist',
  },
];

export const login = [
  {
    title: 'Login',
    icon: <FcGoogle />,
    src: '/',
  },
];

export const keywords = [
  {
    title: 'REACT',
    src: '/search/REACT',
  },
  {
    title: 'TYPESCRIPT',
    src: '/search/TYPESCRIPT',
  },
  {
    title: 'NEXT',
    src: '/search/NEXT',
  },
  {
    title: 'JAVASCRIPT',
    src: '/search/JAVASCRIPT',
  },
  {
    title: 'html',
    src: '/search/html',
  },
  {
    title: 'HOT MOVIE',
    src: '/search/HOTMOVIE',
  },
  {
    title: 'K-POP',
    src: '/search/K-POP',
  },
  {
    title: '치지직⚡',
    src: '/search/CHEEZH',
  },
  {
    title: 'K-DRAMA',
    src: '/search/K-DRAMA',
  },
];

export const snsLink = [
  {
    title: 'github',
    url: 'https://github.com/webstoryboy',
    icon: <AiFillGithub />,
  },
  {
    title: 'youtube',
    url: 'https://www.youtube.com/webstoryboy',
    icon: <AiFillYoutube />,
  },
  {
    title: 'codepen',
    url: 'https://codepen.io/webstoryboy',
    icon: <AiOutlineCodepen />,
  },
  {
    title: 'instagram',
    url: 'https://www.instagram.com/webstoryboy',
    icon: <AiOutlineInstagram />,
  },
];
