import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Добавлен импорт Link

const Equipment = () => {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/equipment');
        setEquipment(response.data);
        setFilteredEquipment(response.data);

        // Получаем уникальные значения бренда и категории
        const brands = [...new Set(response.data.map((item) => item.brand))];
        const categories = [...new Set(response.data.map((item) => item.category))];
        const sizes = [...new Set(response.data.map((item) => item.size))];
        setUniqueBrands(brands);
        setUniqueCategories(categories);
        setUniqueSizes(sizes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEquipment();
  }, []);

  const handleApplyFilter = () => {
    let filtered = equipment;

    if (brandFilter) {
      filtered = filtered.filter((item) =>
        item.brand.toLowerCase().includes(brandFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (sizeFilter) {
      filtered = filtered.filter((item) => 
        item.size.toLowerCase().includes(sizeFilter.toLowerCase()));
    }

    setFilteredEquipment(filtered);
  };

  const handleResetFilter = () => {
    setBrandFilter('');
    setCategoryFilter('');
    setSizeFilter('');
    setFilteredEquipment(equipment);
  };

  const handleOrderClick = (item) => {
    navigate(`/order/${item.id}`);
  };

  return (
    <Container>
      <h2>Экипировка</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="brandFilter">
              <Form.Label>Бренд:</Form.Label>
              <Form.Control as="select" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                <option value="">Выберите бренд</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="categoryFilter">
              <Form.Label>Категория:</Form.Label>
              <Form.Control
                as="select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Выберите категорию</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sizeFilter">
            <Form.Label>Размер:</Form.Label>
              <Form.Control as="select" value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
                <option value="">Выберите размер</option>
                {uniqueSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" className="mb-3" onClick={handleApplyFilter}>
          Применить фильтр
        </Button>
        <Button variant="outline-secondary" className="mb-3 ml-2" onClick={handleResetFilter}>
          Сбросить фильтр
        </Button>
      </Form>
      <Row>
        {filteredEquipment.map((item) => (
          <Col key={item.id} xs={12} md={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img
                variant="top"
                src={item.image_url}
                alt={item.model}
                className="img-fluid"
              />
              <Card.Body>
                <Card.Title>{item.brand} {item.model}</Card.Title>
                <Card.Text>
                  <strong>Размер:</strong> {item.size}<br />
                  <strong>Цвет:</strong> {item.color}<br />
                  <strong>Цена:</strong> {item.price} руб.
                </Card.Text>
                <Button variant="primary" className="mt-3 mr-2" onClick={() => handleOrderClick(item)}>
                  Заказать
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Equipment;