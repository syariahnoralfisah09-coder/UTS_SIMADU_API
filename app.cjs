
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('./docs/openapi.json');

const app = express();

const authRoutes = require('./src/routes/auth.routes.cjs');
const pengaduanRoutes = require('./src/routes/pengaduan.routes.cjs');

// Middleware dasar
app.use(cors());
app.use(express.json());

// Route autentikasi
app.use('/api/auth', authRoutes);

// Route pengaduan
app.use('/api/pengaduan', pengaduanRoutes);

// Endpoint untuk mengecek kondisi server
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'SIMADU API berjalan dengan baik'
    });
});

// Endpoint pengecekan API
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'SIMADU API siap digunakan'
    });
});

// Dokumentasi API menggunakan Swagger UI
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(openapiSpec)
);

// Menangani endpoint yang tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Menangani error dari seluruh aplikasi
app.use((err, req, res, next) => {
    // Menangani format JSON yang tidak valid
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            message: 'Format JSON tidak valid'
        });
    }

    // Menangani ukuran JSON yang terlalu besar
    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            message: 'Ukuran data terlalu besar'
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: statusCode >= 500
            ? 'Terjadi kesalahan pada server'
            : err.message
    });
});

module.exports = app;
