
## Menjalankan secara lokal (XAMPP)

1. Nyalakan **MySQL** di XAMPP Control Panel.
2. Database `solopilah` dan akun aplikasi dibuat dari `database.sql`. Konfigurasi lokal berada di `.env.local`; jangan commit file tersebut.
3. Jalankan API pada terminal pertama: `npm run dev:server`.
4. Jalankan frontend pada terminal kedua: `npm run dev`.
5. Buka `http://localhost:3000`. Frontend terhubung ke API pada `http://localhost:3001/api`.

Jika host atau port MySQL berbeda, ubah `DB_HOST` dan `DB_PORT` di `.env.local`. Daftar origin browser yang diizinkan untuk API dapat diatur melalui `CORS_ORIGIN`.
