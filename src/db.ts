import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Backend dijalankan oleh Node (bukan Vite), jadi `.env.local` perlu dimuat
// secara eksplisit. File `.env` tetap dapat dipakai sebagai fallback.
dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ quiet: true });

const requiredSettings = ["DB_HOST", "DB_USER", "DB_NAME"] as const;
const missingSettings = requiredSettings.filter((setting) => !process.env[setting]);

if (missingSettings.length > 0) {
  throw new Error(`Konfigurasi database belum lengkap: ${missingSettings.join(", ")}`);
}

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
