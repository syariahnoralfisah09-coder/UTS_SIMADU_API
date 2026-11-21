# SIMADU API

REST API Sistem Informasi Manajemen Pengaduan Mahasiswa (SIMADU) yang dibuat untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Web Service Engineering.

## 1. Deskripsi Proyek

SIMADU API merupakan layanan web yang digunakan untuk mengelola pengaduan mahasiswa. API menyediakan fitur autentikasi pengguna, pengelolaan data pengaduan, serta pembatasan hak akses berdasarkan peran pengguna.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js 5
- JavaScript
- JSON
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- Swagger UI
- Visual Studio Code

## 3. Fitur API

- Login mahasiswa dan administrator.
- Melihat daftar pengaduan.
- Melihat detail pengaduan.
- Membuat pengaduan baru.
- Mengubah isi pengaduan.
- Mengubah status pengaduan oleh administrator.
- Menghapus pengaduan.
- Validasi data dan autentikasi JWT.
- Pembatasan akses berdasarkan peran dan kepemilikan data.

## 4. Hak Akses Pengguna

| Fitur | Mahasiswa | Administrator |
|---|---|---|
| Melihat pengaduan sendiri | Ya | Ya |
| Melihat seluruh pengaduan | Tidak | Ya |
| Membuat pengaduan | Ya | Tidak |
| Mengubah isi pengaduan | Ya, milik sendiri dan status diajukan | Tidak |
| Mengubah status pengaduan | Tidak | Ya |
| Menghapus pengaduan | Ya, milik sendiri dan status diajukan | Tidak |

## 5. Struktur Folder

```text
UTS_SIMADU_API/
├── docs/
│   └── openapi.json
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   └── services/
├── tests/
├── .env
├── .env.example
├── .gitignore
├── app.cjs
├── server.cjs
├── package.json
├── package-lock.json
└── README.md
```

## 6. Cara Menjalankan Proyek

1. Pastikan Node.js dan npm sudah terpasang.
2. Buka folder proyek melalui Visual Studio Code.
3. Buka terminal pada folder proyek.
4. Jalankan perintah:

```bash
npm install
```

5. Buat file `.env` berdasarkan `.env.example`.
6. Isi konfigurasi port dan JWT secret pada file `.env`.
7. Jalankan server menggunakan:

```bash
npm run dev
```

8. Server berjalan pada:

```text
http://localhost:3000
```

## 7. Dokumentasi API

Dokumentasi API menggunakan Swagger UI dan dapat diakses melalui:

```text
http://localhost:3000/api-docs
```

### Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/auth/login` | Login pengguna |
| GET | `/api/pengaduan` | Melihat daftar pengaduan |
| GET | `/api/pengaduan/:id` | Melihat detail pengaduan |
| POST | `/api/pengaduan` | Membuat pengaduan |
| PUT | `/api/pengaduan/:id` | Mengubah pengaduan |
| PATCH | `/api/pengaduan/:id/status` | Mengubah status pengaduan |
| DELETE | `/api/pengaduan/:id` | Menghapus pengaduan |

## 8. Status HTTP

| Kode | Keterangan |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 400 | Data atau permintaan tidak valid |
| 401 | Autentikasi tidak valid |
| 403 | Akses ditolak |
| 404 | Data atau endpoint tidak ditemukan |
| 500 | Kesalahan server |

## 9. Keamanan API

Keamanan API diterapkan melalui beberapa mekanisme:

- Password disimpan dalam bentuk hash menggunakan bcryptjs.
- Autentikasi menggunakan JSON Web Token (JWT).
- Token diperiksa melalui middleware autentikasi.
- Hak akses dibatasi berdasarkan peran pengguna.
- Mahasiswa hanya dapat mengelola pengaduan miliknya sendiri.
- Data yang tidak diizinkan akan ditolak melalui validasi.

## 10. Pengujian

Pengujian dilakukan menggunakan Swagger UI dengan mencakup:

- Login mahasiswa dan administrator.
- Pengujian autentikasi token.
- Pengujian hak akses mahasiswa.
- Pengujian hak akses administrator.
- Pengujian tambah, lihat, ubah, dan hapus pengaduan.
- Pengujian validasi data.
- Pengujian ID pengaduan yang tidak ditemukan.
- Pengujian token JWT tidak valid.

Bukti pengujian disimpan dalam bentuk screenshot sebagai dokumentasi pengerjaan UTS.

## 11. Catatan

Data pengaduan dan pengguna pada proyek ini disimpan sementara di dalam aplikasi (in-memory). Oleh karena itu, data pengaduan yang dibuat atau diubah akan kembali ke data awal ketika server dimulai ulang.

---

**Proyek UTS Web Service Engineering**

SIMADU API – Sistem Informasi Manajemen Pengaduan Mahasiswa.
