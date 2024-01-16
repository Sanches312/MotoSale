import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useComparison } from '../Contexts/ComparisonContext';
import { useNavigate } from 'react-router-dom';

const Motorcycles = () => {
  const navigate = useNavigate();
  const [motorcycles, setMotorcycles] = useState([]);
  const { addMotorcycleToComparison, isMotorcycleInComparison } = useComparison();
  const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
  const [brandFilter, setBrandFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/motorcycles');
        setMotorcycles(response.data);
        setFilteredMotorcycles(response.data);

        // Получаем уникальные значения бренда и типа
        const brands = [...new Set(response.data.map((motorcycle) => motorcycle.brand))];
        const types = [...new Set(response.data.map((motorcycle) => motorcycle.type))];
        const years= [...new Set(response.data.map((motorcycle) => motorcycle.year))];
        setUniqueBrands(brands);
        setUniqueTypes(types);
        setUniqueYears(years);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMotorcycles();
  }, []);

  const handleAddToComparison = (motorcycle) => {
    addMotorcycleToComparison(motorcycle);
  };

  const handleApplyFilter = () => {
    let filtered = motorcycles;

    if (brandFilter) {
      filtered = filtered.filter((motorcycle) =>
        motorcycle.brand.toLowerCase().includes(brandFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((motorcycle) =>
        motorcycle.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    if (yearFilter) {
      filtered = filtered.filter((motorcycle) =>
        String(motorcycle.year).toLowerCase().includes(yearFilter.toLowerCase())
      );
    }    

    setFilteredMotorcycles(filtered);
  };

  const handleResetFilter = () => {
    setBrandFilter('');
    setTypeFilter('');
    setYearFilter('');
    setFilteredMotorcycles(motorcycles);
  };

  const handleOrderClick = (motorcycle) => {
    navigate(`/order/${motorcycle.id}`);
  };

  const handleTestDriveClick = (motorcycle) => {
    navigate(`/test-drive/${motorcycle.id}`);
  };

  return (
    <Container>
      <h2>Мотоциклы</h2>
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
            <Form.Group controlId="typeFilter">
              <Form.Label>Тип мотоцикла:</Form.Label>
              <Form.Control as="select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">Выберите тип мотоцикла</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="yearFilter">
            <Form.Label>Год:</Form.Label>
            <Form.Control as="select" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
              <option value="">Выберите год</option>
              {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
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
        {filteredMotorcycles.map((motorcycle) => (
          <Col key={motorcycle.id} xs={12} md={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img
                variant="top"
                src={motorcycle.image_url}
                alt={motorcycle.model}
                className="img-fluid"
              />
              <Card.Body>
                <Card.Title>{motorcycle.brand} {motorcycle.model}</Card.Title>
                <Card.Text>
                  <strong>Год выпуска:</strong> {motorcycle.year}<br />
                  <strong>Объем двигателя:</strong> {motorcycle.engine_capacity} см³<br />
                  <strong>Максимальная мощность:</strong> {motorcycle.horsepower} л.с.<br />
                  <strong>Цена:</strong> {motorcycle.price} руб.
                </Card.Text>
                <Button
                  variant={isMotorcycleInComparison(motorcycle.id) ? "success" : "secondary"}
                  className="mt-3 mr-2"
                  onClick={() => handleAddToComparison(motorcycle)}
                >
                  {isMotorcycleInComparison(motorcycle.id) ? "В сравнении" : "Сравнить"}
                </Button>
                <Button variant="primary" className="mt-3 mr-2" onClick={() => handleOrderClick(motorcycle)}>
                  Заказать
                </Button>
                <Button variant="primary" className="mt-3 mr-2" onClick={() => handleTestDriveClick(motorcycle)}>
                  Тест-драйв
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Motorcycles;