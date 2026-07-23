import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Semua field wajib diisi" });
        }
        
        const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
        if ((rows as any[]).length > 0) {
            return res.status(400).json({ success: false, message: "Email sudah terdaftar" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        
        return res.json({ success: true, message: "Registrasi berhasil" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
        }
        
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        const users = rows as any[];
        
        if (users.length === 0) {
            return res.status(401).json({ success: false, message: "Email atau password salah" });
        }
        
        const user = users[0];
        const valid = await bcrypt.compare(password, user.password);
        
        if (!valid) {
            return res.status(401).json({ success: false, message: "Email atau password salah" });
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );
        
        return res.json({
            success: true,
            message: "Login berhasil",
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});