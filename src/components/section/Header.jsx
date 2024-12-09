import GeneralLogin from 'components/contents/GeneralLogin';
import GoogleBtn from 'components/contents/GoogleBtn';
import HeaderLogo from 'components/contents/HeaderLogo';
import KeywordList from 'components/headerSubComponents/KeywordList';
import MenuList from 'components/headerSubComponents/MenuList';
import SnsLinkList from 'components/headerSubComponents/SnsLinkList';
import { keywords, menus, snsLink } from 'data/header';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthStore from 'store/useAuthStore';

export default function Header() {
  const location = useLocation();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };
  const { loginMethod } = useAuthStore();

  return (
    <header id='header' role='banner' className={isMenuActive ? 'active' : ''}>
      <HeaderLogo toggleMenu={toggleMenu} />

      <nav className='header__menu' role='navigation' aria-label='Main menu'>
        <MenuList
          menus={menus}
          pathname={location.pathname}
          toggleMenu={toggleMenu}
        />
        {loginMethod !== 'google' && <GeneralLogin />}
        {loginMethod !== 'general' && <GoogleBtn />}
        <KeywordList
          keywords={keywords}
          pathname={location.pathname}
          toggleMenu={toggleMenu}
        />
      </nav>

      <SnsLinkList snsLink={snsLink} />
    </header>
  );
}
