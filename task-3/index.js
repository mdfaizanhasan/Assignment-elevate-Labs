const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for books
let books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  // Validate request body
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  // Generate a new ID (in a real app, this would be handled differently)
  const id =
    books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;

  const newBook = { id, title, author };
  books.push(newBook);

  res.status(201).json(newBook);
});

// PUT (update) a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  // Validate request body
  if (!title && !author) {
    return res.status(400).json({ message: 'Title or author is required' });
  }

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Update the book
  books[bookIndex] = {
    id,
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author,
  };

  res.json(books[bookIndex]);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const deletedBook = books[bookIndex];
  books = books.filter((book) => book.id !== id);

  res.json(deletedBook);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
''