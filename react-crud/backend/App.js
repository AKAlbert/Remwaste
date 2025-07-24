const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Simple in-memory storage for demo
let items = [{ id: 1, name: 'Sample Item' }];
let nextId = 2;

// Hardcoded user for login
const USER = { username: 'admin', password: 'password' };

// Basic login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    res.json({ success: true, token: 'demo-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Middleware to check a fake token
function auth(req, res, next) {
  if (req.headers.authorization === 'Bearer demo-token') next();
  else res.status(401).json({ message: 'Unauthorized' });
}

// CRUD endpoints
app.get('/items', auth, (req, res) => res.json(items));

app.post('/items', auth, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const item = { id: nextId++, name };
  items.push(item);
  res.status(201).json(item);
});

app.put('/items/:id', auth, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find(x => x.id == id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  if (!name) return res.status(400).json({ message: 'Name is required' });
  item.name = name;
  res.json(item);
});

app.delete('/items/:id', auth, (req, res) => {
  const { id } = req.params;
  const idx = items.findIndex(x => x.id == id);
  if (idx === -1) return res.status(404).json({ message: 'Item not found' });
  const [deleted] = items.splice(idx, 1);
  res.json(deleted);
});

const PORT = 5050;
if (require.main === module) {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}
module.exports = app;
