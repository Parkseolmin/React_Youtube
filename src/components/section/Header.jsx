import GoogleBtn from 'components/contents/GoogleBtn';
import HeaderLogo from 'components/contents/HeaderLogo';
import { keywords, login, menus, snsLink } from 'data/header';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };
  return (
    <header id='header' role='banner' className={isMenuActive ? 'active' : ''}>
      <HeaderLogo toggleMenu={toggleMenu} />

      <nav className='header__menu' role='navigation' aria-label='Main menu'>
        <ul className='menu' role='menubar'>
          {menus.map((menu, index) => (
            <li
              role='none'
              key={index}
              className={location.pathname === menu.src ? 'active' : ''}
              tabIndex={index + 1}
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

        {/* 구글 로그인 */}
        <GoogleBtn />

        <ul className='keyword' aria-label='Keywords' role='menubar'>
          {keywords.map((keyword, index) => (
            <li
              role='none'
              key={index}
              className={location.pathname === keyword.src ? 'active' : ''}
              tabIndex={menus.length + login.length + index + 1}
            >
              <Link
                role='menuitem'
                to={keyword.src}
                onClick={() => setIsMenuActive(false)}
              >
                {keyword.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className='header__sns' aria-label='Social media links'>
        <ul>
          {snsLink.map((sns, index) => (
            <li
              key={index}
              tabIndex={
                menus.length + login.length + keywords.length + index + 1
              }
            >
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
