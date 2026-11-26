
const express = require('express');
const router = express.Router();

const pengaduanController = require('../controllers/pengaduan.controller.cjs');
const { authenticateToken } = require('../middleware/auth.middleware.cjs');
const { authorizeRoles } = require('../middleware/role.middleware.cjs');

// Semua endpoint pengaduan wajib menggunakan token
router.use(authenticateToken);

// Melihat daftar pengaduan
router.get('/', pengaduanController.getAll);

// Melihat detail pengaduan
router.get('/:id', pengaduanController.getById);

// Membuat pengaduan: mahasiswa
router.post(
  '/',
  authorizeRoles('mahasiswa'),
  pengaduanController.create
);

// Mengubah isi pengaduan: mahasiswa
router.put(
  '/:id',
  authorizeRoles('mahasiswa'),
  pengaduanController.update
);

// Mengubah status pengaduan: admin
router.patch(
  '/:id/status',
  authorizeRoles('admin'),
  pengaduanController.updateStatus
);

// Menghapus pengaduan: mahasiswa
router.delete(
  '/:id',
  authorizeRoles('mahasiswa'),
  pengaduanController.remove
);

module.exports = router;
