import {
  books,
  findBookById,
  searchByTitle,
  addBook,
  updateBook,
  removeBook
} from "../data/books.js";

export function list(req, res) {
  const { q } = req.query;
  const data = q ? searchByTitle(q) : books;
  res.json({ count: data.length, data });
}

export function getOne(req, res) {
  const book = findBookById(Number(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
}

export function create(req, res) {
  const { title, price, author, isAvailable } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const book = addBook({ title, price, author, isAvailable });
  res.status(201).json(book);
}

export function update(req, res) {
  const updated = updateBook(Number(req.params.id), req.body);
  if (!updated) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(updated);
}

export function remove(req, res) {
  const removed = removeBook(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(204).send();
}
