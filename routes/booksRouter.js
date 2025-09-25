const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let books = [
  { id: uuidv4(), title: 'Sefer Bereshit', author: 'Moshe Rabbenu' },
  { id: uuidv4(), title: 'Sefer Shemot', author: 'Moshe Rabbenu' },
];

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author are required' });

  const newBook = { id: uuidv4(), title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });

  books[bookIndex] = {
    id: books[bookIndex].id,
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author,
  };
  res.json(books[bookIndex]);
});

router.delete('/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook[0]);
});

module.exports = router;
