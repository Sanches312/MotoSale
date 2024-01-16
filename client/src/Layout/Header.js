import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">TigricMoto</Link>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Главная</Link>
            </li>
            <li className="nav-item">
              <Link to="/motorcycles" className="nav-link">Мотоциклы</Link>
            </li>
            <li className="nav-item">
              <Link to="/gear" className="nav-link">Экипировка</Link>
            </li>
            <li className="nav-item">
              <Link to="/comparison" className="nav-link">Сравнение</Link>
            </li>
            <li className="nav-item">
              <Link to="/reviews" className="nav-link">Отзывы</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/cabinet" className="nav-link">
                    {user.username} Кабинет
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>
                    Выйти
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
