import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get('http://localhost:5000/api/reviews');
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Отзывы</h2>
      <Row xs={1} md={2} lg={3}>
        {reviews.map((review) => (
          <Col key={review.id}>
            <Card style={{ marginBottom: '15px' }}>
              <Card.Img variant="top" src={review.image_url} alt={`Review ${review.id}`} />
              <Card.Body>
                <Card.Title>User: {review.username}</Card.Title>
                <Card.Text>
                  <strong>Motorcycle:</strong> {`${review.motorcycle_brand} ${review.motorcycle_model}`}<br />
                  <strong>Rating:</strong> {review.rating}<br />
                  <strong>Content:</strong> {review.content}<br />
                  <strong>Created At:</strong> {new Date(review.created_at).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reviews;
