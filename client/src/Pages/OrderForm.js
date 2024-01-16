import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const OrderForm = () => {
  const [users, setUsers] = useState([]);
  const [motorcycles, setMotorcycles] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    user_id: '',
    product_category: '',
    product_id: '',
    status: 'заказан',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMotorcycles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/motorcycles');
      if (response.data) {
        return response.data; // Вернуть данные
      } else {
        console.error('Invalid response format:', response);
        return [];
      }
    } catch (error) {
      console.error('Error fetching motorcycles:', error);
      return [];
    }
  };
  
  const fetchEquipment = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/equipment');
      if (response.data) {
        return response.data; // Вернуть данные
      } else {
        console.error('Invalid response format:', response);
        return [];
      }
    } catch (error) {
      console.error('Error fetching equipment:', error);
      return [];
    }
  };
  

  useEffect(() => {
    fetchUsers();
    fetchMotorcycles();
    fetchEquipment();
  }, []);

  const handleProductCategoryChange = async (e) => {
    const productCategory = e.target.value;
    setOrderInfo({
      ...orderInfo,
      product_category: productCategory,
      product_id: '',
    });
  
    // Подождать, пока данные загрузятся
    try {
      let data;
      if (productCategory === 'motorcycle') {
        data = await fetchMotorcycles();
        setMotorcycles(data); // Установить данные в состояние
      } else if (productCategory === 'equipment') {
        data = await fetchEquipment();
        setEquipment(data); // Установить данные в состояние
      }
  
      if (!data || data.length === 0) {
        console.error('Ответ от сервера не содержит ожидаемых данных');
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    }
  };
  
  

  const handleOrderSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderInfo);

      if (response.status === 201) {
        setSuccessMessage('Заказ успешно оформлен!');
      } else {
        console.error('Ошибка при создании заказа');
      }
    } catch (error) {
      console.error('Ошибка при создании заказа', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="userSelect">
              <Form.Label>Выберите пользователя:</Form.Label>
              <Form.Control
                as="select"
                value={orderInfo.user_id}
                onChange={(e) => setOrderInfo({ ...orderInfo, user_id: e.target.value })}
              >
                <option value="">Выберите пользователя</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="categorySelect">
              <Form.Label>Выберите категорию продукта:</Form.Label>
              <Form.Control
                as="select"
                value={orderInfo.product_category}
                onChange={handleProductCategoryChange}
              >
                <option value="">Выберите категорию продукта</option>
                <option value="motorcycle">Мотоцикл</option>
                <option value="equipment">Экипировка</option>
              </Form.Control>
            </Form.Group>

            {orderInfo.product_category === 'motorcycle' && (
              <Form.Group controlId="motorcycleSelect">
                <Form.Label>Выберите мотоцикл:</Form.Label>
                <Form.Control
                  as="select"
                  value={orderInfo.product_id}
                  onChange={(e) => setOrderInfo({ ...orderInfo, product_id: e.target.value })}
                >
                  <option value="">Выберите мотоцикл</option>
                  {motorcycles.map((motorcycle) => (
                    <option key={motorcycle.id} value={motorcycle.id}>
                      {`${motorcycle.brand} ${motorcycle.model}`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            {orderInfo.product_category === 'equipment' && (
              <Form.Group controlId="equipmentSelect">
                <Form.Label>Выберите экипировку:</Form.Label>
                <Form.Control
                  as="select"
                  value={orderInfo.product_id}
                  onChange={(e) => setOrderInfo({ ...orderInfo, product_id: e.target.value })}
                >
                  <option value="">Выберите экипировку</option>
                  {equipment.map((item) => (
                    <option key={item.id} value={item.id}>
                      {`${item.brand} ${item.model}`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            <Button variant="primary" onClick={handleOrderSubmit}>
              Заказать
            </Button>

            {successMessage && (
              <div>
                <p>{successMessage}</p>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderForm;