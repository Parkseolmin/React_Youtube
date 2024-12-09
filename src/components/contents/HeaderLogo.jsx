import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderLogo({ toggleMenu }) {
  return (
    <h1 className='header__logo' onClick={toggleMenu}>
      <div className='flex m-[10px] items-center'>
        <em aria-hidden='true'></em>
        <Link to='/'>
          <span>
            파지직
            <span
              style={{
                fontSize: '10px',
                paddingLeft: '5px',
                justifyContent: 'flex-start',
              }}
            >
              TV
            </span>
          </span>
        </Link>
      </div>
    </h1>
  );
}
