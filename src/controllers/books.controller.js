import { prisma } from "../db.js";

export async function list(req, res) {
  const { q } = req.query;
  if (q) {
    const results = await prisma.book.findMany({
      where: {
        title: {
          contains: q
        }
      }
    });
    return res.json({ count: results.length, data: results });
  }

  const books = await prisma.book.findMany();
  res.json({ count: books.length, data: books });
}

export async function getOne(req, res) {
  const book = await prisma.book.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
}

export async function create(req, res) {
  const { title, price, author, isAvailable } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const book = await prisma.book.create({
    data: { title, price, author, isAvailable }
  });
  res.status(201).json(book);
}

export async function update(req, res) {
  try {
    const updated = await prisma.book.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ message: "Book not found" });
    }
    throw error;
  }
}

export async function remove(req, res) {
  try {
    await prisma.book.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ message: "Book not found" });
    }
    throw error;
  }
}
