import mysql from 'mysql';

// Подключение к базе данных
export const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'Tigar_3003',
  database: 'motosale',
});

db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.stack);
    return;
  }
  console.log('Подключено к базе данных с id ' + db.threadId);
});

export default db;