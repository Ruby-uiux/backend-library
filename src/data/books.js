export const books = [
  { id: 1, title: "Node.js Basics", author: "Bat", price: 45000, isAvailable: true },
  { id: 2, title: "Express Advanced", author: "Bold", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma ORM", author: "Sarna", price: 61000, isAvailable: false },
  { id: 4, title: "JavaScript Fundamentals", author: "Anu", price: 38000, isAvailable: true }
];

let nextId = 5;

export function findBookById(id) {
  return books.find((book) => book.id === id);
}

export function searchByTitle(keyword) {
  return books.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

export function countAvailable() {
  return books.filter((book) => book.isAvailable).length;
}

export function sum(a, b) {
  return a + b;
}

export function isExpensive(book) {
  return book.price > 50000;
}

export function getTitles(booksList) {
  return booksList.map((book) => book.title);
}

export const formatPrice = (price) => `${price}₮`;

export function getBooksFromDb() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books), 500);
  });
}

export function getBookOrThrow(id) {
  const book = findBookById(id);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
}

export function addBook(input) {
  const book = {
    id: nextId++,
    isAvailable: true,
    ...input
  };
  books.push(book);
  return book;
}

export function updateBook(id, changes) {
  const book = findBookById(id);
  if (!book) return null;

  const { id: ignoredId, ...safeChanges } = changes;
  Object.assign(book, safeChanges);
  return book;
}

export function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;

  books.splice(index, 1);
  return true;
}
