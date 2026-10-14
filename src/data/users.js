export const users = [
  { id: 1, name: "Bat", email: "bat@example.com", role: "USER", password: "SecretPassword123" },
  { id: 2, name: "Bold", email: "bold@example.com", role: "ADMIN", password: "AdminPassword456" },
  { id: 3, name: "Sarna", email: "sarna@example.com", role: "USER", password: "UserPassword789" },
  { id: 4, name: "Anu", email: "anu@example.com", role: "ADMIN", password: "SuperPassword000" }
];

let nextId = 5;

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function findByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function countAdmins() {
  return users.filter((user) => user.role === "ADMIN").length;
}

export function addUser(input) {
  const user = { id: nextId++, ...input };
  users.push(user);
  return user;
}

export function updateUser(id, changes) {
  const user = findUserById(id);
  if (!user) return null;

  const { id: ignoredId, ...safeChanges } = changes;
  Object.assign(user, safeChanges);
  return user;
}

export function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}
