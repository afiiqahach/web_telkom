import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for frontend requests

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'telkom1', 
});

// Koneksi ke MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// API endpoint untuk mengambil data
app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM tiket'; 
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Menjalankan server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});