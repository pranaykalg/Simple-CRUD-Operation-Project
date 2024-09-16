const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '123456789P@', // replace with your MySQL password
  database: 'pranay_shoes',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Create a new shoe
app.post('/shoes', (req, res) => {
  const { name, size, brand, price, contact } = req.body;
  const query = 'INSERT INTO shoes (name, size, brand, price, contact) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [name, size, brand, price, contact], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Read shoes
app.get('/shoes', (req, res) => {
  const query = 'SELECT * FROM shoes';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a shoe
app.put('/shoes/:id', (req, res) => {
  const { id } = req.params;
  const { name, size, brand, price, contact } = req.body;
  const query = 'UPDATE shoes SET name = ?, size = ?, brand = ?, price = ?, contact = ? WHERE id = ?';
  connection.query(query, [name, size, brand, price, contact, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Delete a shoe
app.delete('/shoes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM shoes WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Create a new deleted shoe
app.post('/deleted-shoes', (req, res) => {
  const { name, size, brand, price, contact } = req.body;
  const query = 'INSERT INTO deleted_shoes (name, size, brand, price, contact) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [name, size, brand, price, contact], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Read deleted shoes
app.get('/deleted-shoes', (req, res) => {
  const query = 'SELECT * FROM deleted_shoes';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})