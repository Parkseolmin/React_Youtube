import GeneralLogin from 'components/contents/GeneralLogin';
import GoogleBtn from 'components/contents/GoogleBtn';
import HeaderLogo from 'components/contents/HeaderLogo';
import { keywords, login, menus, snsLink } from 'data/header';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
        <ul className='menu' role='menubar'>
          {menus.map((menu, index) => (
            <li
              key={index}
              className={location.pathname === menu.src ? 'active' : ''}
            >
              <Link
                role='menuitem'
                to={menu.src}
                onClick={() => setIsMenuActive(false)}
              >
                {menu.icon}
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* 조건부 렌더링 */}
        {loginMethod !== 'google' && <GeneralLogin />}
        {loginMethod !== 'general' && <GoogleBtn />}

        <ul className='keyword' aria-label='Keywords' role='menubar'>
          {keywords.map((keyword, index) => (
            <li
              key={index}
              className={location.pathname === keyword.src ? 'active' : ''}
            >
              <Link
                role='menuitem'
                to={keyword.src}
                onClick={() => setIsMenuActive(false)}
              >
                <span>{keyword.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className='header__sns' aria-label='Social media links'>
        <ul role='menubar'>
          {snsLink.map((sns, index) => (
            <li key={index} role='menuitem'>
              <a
                href={sns.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={sns.title}
              >
                <span>{sns.icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
