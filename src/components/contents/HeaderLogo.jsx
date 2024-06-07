import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderLogo({ toggleMenu }) {
  return (
    <h1 className='header__logo' onClick={toggleMenu}>
      <Link to='/'>
        <em aria-hidden='true'></em>
        <span>YOUTUBE</span>
      </Link>
    </h1>
  );
}
