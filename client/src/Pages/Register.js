import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      console.log(response.data);

      navigate('/login');
    } catch (error) {
      console.error(error);
      setMessage('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

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
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="button" className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>

        <div className="mt-3">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="btn btn-link">
            Войдите здесь
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;