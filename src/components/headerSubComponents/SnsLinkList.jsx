import React, { memo } from 'react';

const SnsLinkList = memo(({ snsLink }) => (
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
));
export default SnsLinkList;
