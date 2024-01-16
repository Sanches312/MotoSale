import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const TestDriveForm = () => {
  const [users, setUsers] = useState([]);
  const [motorcycles, setMotorcycles] = useState([]);
  const [testDriveInfo, setTestDriveInfo] = useState({
    user_id: '',
    motorcycle_id: '',
    status: 'заказан',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
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
        setMotorcycles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    fetchMotorcycles();
  }, []);

  const handleTestDriveSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders/test-drives', testDriveInfo);

      if (response.status === 201) {
        setSuccessMessage('Тест-драйв успешно оформлен!');
        // Здесь можете сбросить форму или выполнить другие действия после успешного оформления тест-драйва
      } else {
        console.error('Ошибка при создании тест-драйва');
      }
    } catch (error) {
      console.error('Ошибка при создании тест-драйва', error);
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
                value={testDriveInfo.user_id}
                onChange={(e) => setTestDriveInfo({ ...testDriveInfo, user_id: e.target.value })}
              >
                <option value="">Выберите пользователя</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="motorcycleSelect">
              <Form.Label>Выберите мотоцикл для тест-драйва:</Form.Label>
              <Form.Control
                as="select"
                value={testDriveInfo.motorcycle_id}
                onChange={(e) => setTestDriveInfo({ ...testDriveInfo, motorcycle_id: e.target.value })}
              >
                <option value="">Выберите мотоцикл</option>
                {motorcycles.map((motorcycle) => (
                  <option key={motorcycle.id} value={motorcycle.id}>
                    {`${motorcycle.brand} ${motorcycle.model}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={handleTestDriveSubmit}>
              Оформить тест-драйв
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

export default TestDriveForm;