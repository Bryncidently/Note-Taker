const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  res.json(notes);
});

//note to self: make sure your file paths are legit or it screws up your world
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = generateUniqueId(); 
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(newNote);
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


function generateUniqueId() {

  return Math.floor(Math.random() * 1000);
}


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

