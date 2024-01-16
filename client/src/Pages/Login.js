import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      console.log(response.data);

      login(response.data);

      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage('Неверное имя пользователя или пароль.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}

      <form>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <div className="mt-3">
          Нет аккаунта?{' '}
          <Link to="/register" className="btn btn-link">
            Зарегистрируйтесь здесь
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;