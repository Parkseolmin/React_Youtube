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

      <nav className='header__menu'>
        <ul className='menu'>
          {menus.map((menu, index) => (
            <li
              key={index}
              className={location.pathname === menu.src ? 'active' : ''}
            >
              <Link to={menu.src} onClick={() => setIsMenuActive(false)}>
                {menu.icon}
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>

        <ul className='menu login'>
          {login.map((l, index) => (
            <li key={index}>
              <Link to={'/'} onClick={() => setIsMenuActive(false)}>
                {l.icon}
                {l.title}
              </Link>
            </li>
          ))}
        </ul>

        <ul className='keyword'>
          {keywords.map((keyword, index) => (
            <li
              key={index}
              className={location.pathname === keyword.src ? 'active' : ''}
            >
              <Link to={keyword.src} onClick={() => setIsMenuActive(false)}>
                {keyword.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className='header__sns'>
        <ul>
          {snsLink.map((sns, index) => (
            <li key={index}>
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
      </div>
    </header>
  );
}
