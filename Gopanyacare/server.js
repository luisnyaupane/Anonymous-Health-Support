const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");  // Added CORS

const app = express();
const PORT = 3000;

// Enable CORS for Live Server origins (adjust ports as needed)
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
}));

// Serve frontend files from loginpage folder
app.use(express.static(path.join(__dirname, "meanpage", "loginpage")));
app.use(express.json());

const dbPath = path.join(__dirname, "data.json");

// Create data.json if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "[]");
}

// Read data safely
function readUsers() {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    fs.writeFileSync(dbPath, "[]");
    return [];
  }
}

// Save data
function saveUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

// Register ID
app.post("/api/register", (req, res) => {
  const { id } = req.body;
  const users = readUsers();
  if (!users.includes(id)) {
    users.push(id);
    saveUsers(users);
  }
  res.json({ success: true });
});

// Login ID
app.post("/api/login", (req, res) => {
  const { id } = req.body;
  const users = readUsers();
  if (users.includes(id)) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "ID not found" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}/anonymous.html`);
});
