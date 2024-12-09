import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const KeywordList = memo(({ keywords, pathname, toggleMenu }) => (
  <ul className='keyword' aria-label='Keywords' role='menubar'>
    {keywords.map((keyword, index) => (
      <li key={index} className={pathname === keyword.src ? 'active' : ''}>
        <Link
          role='menuitem'
          to={keyword.src}
          onClick={() => toggleMenu(false)}
        >
          <span>{keyword.title}</span>
        </Link>
      </li>
    ))}
  </ul>
));

export default KeywordList;
