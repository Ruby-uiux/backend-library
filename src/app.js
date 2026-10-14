import express from "express";
import booksRouter from "./routes/books.router.js";
import usersRouter from "./routes/users.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Library API", version: "1.0.0" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.get("/profile", (req, res) => {
  res.json({ name: "Bat", role: "USER", email: "bat@example.com" });
});

app.get("/about", (req, res) => {
  res.json({ name: "library-api-js", version: "1.0.0", author: "UFE Student" });
});

app.get("/students", (req, res) => {
  res.json([
    { id: 1, name: "Дорж", code: "BS21001" },
    { id: 2, name: "Сүрэн", code: "BS21002" },
    { id: 3, name: "Болд", code: "BS21003" }
  ]);
});

app.get("/courses", (req, res) => {
  res.json([
    { id: 101, code: "BED411", name: "Web API Development" },
    { id: 102, code: "CS201", name: "Data Structures" }
  ]);
});

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
