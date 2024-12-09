import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const MenuList = memo(({ menus, pathname, toggleMenu }) => (
  <ul className='menu' role='menubar'>
    {menus.map((menu, index) => (
      <li key={index} className={pathname === menu.src ? 'active' : ''}>
        <Link role='menuitem' to={menu.src} onClick={() => toggleMenu(false)}>
          {menu.icon}
          {menu.title}
        </Link>
      </li>
    ))}
  </ul>
));

export default MenuList;
