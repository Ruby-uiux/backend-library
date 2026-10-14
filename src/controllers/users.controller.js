import {
  users,
  findUserById,
  findByEmail,
  addUser,
  updateUser,
  removeUser
} from "../data/users.js";

function withoutPassword(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function list(req, res) {
  res.json({
    count: users.length,
    data: users.map(withoutPassword)
  });
}

export function getOne(req, res) {
  const user = findUserById(Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(withoutPassword(user));
}

export function create(req, res) {
  const { name, email, role, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }
  if (findByEmail(email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const user = addUser({ name, email, role: role ?? "USER", password });
  res.status(201).json(withoutPassword(user));
}

export function update(req, res) {
  const id = Number(req.params.id);
  if (req.body.email && findByEmail(req.body.email)?.id !== id) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const updated = updateUser(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(withoutPassword(updated));
}

export function remove(req, res) {
  const removed = removeUser(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(204).send();
}
