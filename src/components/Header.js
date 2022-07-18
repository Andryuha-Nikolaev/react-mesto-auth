import React from 'react';
import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта Место" />
    </header>
  )
}

export default Header;
