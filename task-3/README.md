# Book Management API

A simple REST API for managing a collection of books.

## Setup

1. Install dependencies: npm init -y
2. Start the server: npm start

3. The server will run on http://localhost:3000

## API Endpoints

### GET /books
Returns all books

### GET /books/:id
Returns a specific book by ID

### POST /books
Creates a new book

Request body:
```json
{
"title": "Book Title",
"author": "Author Name"
}


## Step 5: Testing with Postman

To test your API with Postman:

1. Start your server by running:
   ```bash
   node index.js
   