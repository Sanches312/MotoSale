import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.mjs';
import productRoutes from './routes/products.mjs';
import reviewRoutes from "./routes/reviews.mjs";
import orderRoutes from './routes/orders.mjs';
import { getUsers } from './controllers/auth.mjs';

// Создание экземпляра приложения Express
const app = express();

// Использование middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/users', getUsers);

// Запуск сервера
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
