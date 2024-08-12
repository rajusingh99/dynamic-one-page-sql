const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', 
  database: 'bannerdb',
});
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/api/banner', (req, res) => {
  const query = 'SELECT * FROM banner LIMIT 1';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result[0]);
    }
  });
});

// create 
app.post('/api/banner', (req, res) => {
  const { description, link, timer, visible } = req.body;
  const query = 'UPDATE banner SET description = ?, link = ?, timer = ?, visible = ? WHERE id = 1';
  db.query(query, [description, link, timer, visible], err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

// update timer
app.put('/api/banner/update', (req, res) => {
  const {  description, link, timer, visible } = req.body;
  const query = 'UPDATE banner SET description = ?, link = ?, timer = ?, visible = ? WHERE id = 1';
  db.query(query, [description, link, timer, visible], err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
