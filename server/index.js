import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

// Using basic CORS headers since cors package might not be installed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Helper to read and write DB
const readDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    return { solutions: [] };
  }
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeDb = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// GET all solutions
app.get('/api/solutions', (req, res) => {
  const db = readDb();
  res.json(db.solutions);
});

// GET single solution
app.get('/api/solutions/:id', (req, res) => {
  const db = readDb();
  const solution = db.solutions.find(s => s.id === req.params.id);
  if (solution) {
    res.json(solution);
  } else {
    res.status(404).json({ error: 'Solution not found' });
  }
});

// POST to create new solution
app.post('/api/solutions', (req, res) => {
  const db = readDb();
  const newSolution = req.body;
  if (!newSolution.id) {
    newSolution.id = newSolution.타이틀 || `solution-${Date.now()}`;
  }
  db.solutions.push(newSolution);
  writeDb(db);
  res.status(201).json(newSolution);
});

// PUT to update solution
app.put('/api/solutions/:id', (req, res) => {
  const db = readDb();
  const index = db.solutions.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    // Merge updates
    db.solutions[index] = { ...db.solutions[index], ...req.body, id: req.params.id };
    writeDb(db);
    res.json(db.solutions[index]);
  } else {
    res.status(404).json({ error: 'Solution not found' });
  }
});

// DELETE solution
app.delete('/api/solutions/:id', (req, res) => {
  const db = readDb();
  const index = db.solutions.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    const deleted = db.solutions.splice(index, 1);
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Solution not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Admin Backend server is running on http://localhost:${PORT}`);
});
