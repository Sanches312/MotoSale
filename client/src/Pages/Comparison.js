import React from 'react';
import { useComparison } from '../Contexts/ComparisonContext';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const Comparison = () => {
  const { selectedMotorcycles, removeMotorcycleFromComparison, clearComparisonList } = useComparison();

  const characteristicLabels = [
    'Модель',
    'Год выпуска',
    'Объем двигателя',
    'Максимальная мощность',
    'Тип мотоцикла',
    'Цена',
  ];

  return (
    <Container>
      <h2 className="mt-4">Сравнение мотоциклов</h2>
      {selectedMotorcycles.length === 0 ? (
        <p className="mt-4">Добавьте мотоциклы для сравнения на странице мотоциклов.</p>
      ) : (
        <Row className="mt-4">
          {selectedMotorcycles.map((motorcycle) => (
            <Col key={motorcycle.id} xs={12} md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{motorcycle.brand} {motorcycle.model}</Card.Title>
                  <Card.Text>
                    <strong>{characteristicLabels[1]}:</strong> {motorcycle.year}<br />
                    <strong>{characteristicLabels[2]}:</strong> {motorcycle.engine_capacity} см³<br />
                    <strong>{characteristicLabels[3]}:</strong> {motorcycle.horsepower} л.с.<br />
                    <strong>{characteristicLabels[4]}:</strong> {motorcycle.type}<br />
                    <strong>{characteristicLabels[5]}:</strong> {motorcycle.price} руб.
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => removeMotorcycleFromComparison(motorcycle.id)}
                  >
                    Убрать из сравнения
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Button variant="outline-danger" onClick={clearComparisonList} className="mt-3">
        Очистить сравнение
      </Button>
    </Container>
  );
};

export default Comparison;