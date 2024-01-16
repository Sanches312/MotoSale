import React from 'react';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="container mt-4">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.redd.it/8cq18cz23l131.jpg"
            alt="First slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Лучшие цены</h3>
            <p>Наши мотоциклы и экипировка - по самым доступным ценам!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://expressmotors.ru/wp-content/uploads/f/a/4/fa4824fafcb4bbf12175514669b7deec.jpeg"
            alt="Second slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Попробуй сам</h3>
            <p>Только у нас можно оформить тест-драйв на любой мотоцикл!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://bike.net/res/media/img/oy800/ref/2a9/88672.jpg"
            alt="Third slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Виберите лучший</h3>
            <p>Сравнивайте и покупайте!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="mt-5">
        <h2>Контактная информация</h2>
        <p>Email: TigricMoto@mail.ru</p>
        <p>Телефон: +7 (123) 456-7890</p>
        <p>Адрес: Москва, Весёлая улица, Дом 2</p>
      </div>
    </div>
  );
};

export default Home;
