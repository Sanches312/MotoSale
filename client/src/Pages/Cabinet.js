import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import axios from 'axios';

const Cabinet = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedMotorcycleId, setSelectedMotorcycleId] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [motorcycles, setMotorcycles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [message, setMessage] = useState('');

  const fetchMotorcycles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/motorcycles');
      setMotorcycles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchOrders() {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/all/${user?.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function fetchTestDrives() {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/test-drives/all/${user?.id}`);
      setTestDrives(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  

  const submitReview = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('motorcycle_id', selectedMotorcycleId);
      formData.append('rating', rating);
      formData.append('content', reviewText);
      formData.append('image_url', imageFile);

      const response = await axios.post('http://localhost:5000/api/reviews', formData);

      console.log(response.data);
      setMessage('Отзыв успешно отправлен!');
    } catch (error) {
      console.error(error);
      setMessage('Ошибка при отправке отзыва.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchMotorcycles();
      fetchOrders();
      fetchTestDrives();
      setIsAdmin(user.username === 'admin');
    }
  }, [user?.id]);

  // Функция для обновления статуса заказа
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/update-order-status/${orderId}`, { newStatus });
      // Обновите состояние заказов после успешного запроса, если необходимо
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  // Функция для обновления статуса тест-драйва
  const updateTestDriveStatus = async (testDriveId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/test-drives/update-status/${testDriveId}`, { newStatus });
      // Обновите состояние тест-драйвов после успешного запроса, если необходимо
      fetchTestDrives();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
    <h2>Личный кабинет</h2>
    {user && (
      <>
        <p>Привет, {user.username}!</p>
        <div>
          <h3>Ваши заказы</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Статус</th>
                <th>Категория продукта</th>
                <th>Мотоцикл</th>
                <th>Экипировка</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.product_category}</td>
                  <td>{order.product_category === 'motorcycle' ? `${order.brand} ${order.model}` : '-'}</td>
                  <td>{order.product_category === 'equipment' ? `${order.equipment_brand} ${order.equipment_model}` : '-'}</td>
                  {isAdmin && (
                      <td>
                        <button 
                        className="btn btn-primary" 
                        onClick={() => updateOrderStatus(order.id, 'Обработано')}
                        >
                          Изменить статус
                        </button>
                      </td>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Ваши тест-драйвы</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Статус</th>
                <th>Мотоцикл</th>
              </tr>
            </thead>
            <tbody>
              {testDrives.map((testDrive) => (
                <tr key={testDrive.id}>
                  <td>{testDrive.id}</td>
                  <td>{testDrive.status}</td>
                  <td>{`${testDrive.brand} ${testDrive.model}`}</td>
                  {isAdmin && (
                      <td>
                       <button
                          className="btn btn-primary"
                          onClick={() => updateTestDriveStatus(testDrive.id, 'Обработано')}
                        >
                          Изменить статус
                        </button>
                      </td>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <div>
            <h3>Написать отзыв</h3>
            <div className="mb-3">
              <label className="form-label">Выберите мотоцикл:</label>
              <select
                className="form-select"
                value={selectedMotorcycleId}
                onChange={(e) => setSelectedMotorcycleId(e.target.value)}
              >
                <option value="">Выберите мотоцикл</option>
                {motorcycles.map((motorcycle) => (
                  <option key={motorcycle.id} value={motorcycle.id}>
                    {motorcycle.brand} {motorcycle.model}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Рейтинг:</label>
              <input
                type="number"
                className="form-control"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Текст отзыва:</label>
              <textarea
                className="form-control"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ссылка на изображение:</label>
              <input
                type="text"
                className="form-control"
                value={imageFile}
                onChange={(e) => setImageFile(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={submitReview}>Отправить отзыв</button>
            {message && <p>{message}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Cabinet;