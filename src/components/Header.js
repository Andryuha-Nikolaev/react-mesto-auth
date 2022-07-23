import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';



function Header({ userEmail, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === '/' && (
        <nav className="header__nav">
          <span className="header__email">{userEmail}</span>
          <button className="header__sign-out" onClick={() => onSignOut()}>Выйти</button>
        </nav>
      )}
    </header>
  )
}

export default Header;
