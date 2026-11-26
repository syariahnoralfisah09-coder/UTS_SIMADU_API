
const pengaduanService = require('../services/pengaduan.service.cjs');

function getAll(req, res, next) {
  try {
    const data = pengaduanService.getAll(req.user);

    return res.status(200).json({
      success: true,
      message: 'Daftar pengaduan berhasil diambil',
      data
    });
  } catch (error) {
    next(error);
  }
}

function getById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        message: 'ID pengaduan tidak valid'
      });
    }

    const data = pengaduanService.getById(id, req.user);

    return res.status(200).json({
      success: true,
      message: 'Detail pengaduan berhasil diambil',
      data
    });
  } catch (error) {
    next(error);
  }
}

function create(req, res, next) {
  try {
    const data = pengaduanService.create(req.user, req.body);

    return res.status(201).json({
      success: true,
      message: 'Pengaduan berhasil dibuat',
      data
    });
  } catch (error) {
    next(error);
  }
}

function update(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        message: 'ID pengaduan tidak valid'
      });
    }

    const data = pengaduanService.update(id, req.user, req.body);

    return res.status(200).json({
      success: true,
      message: 'Pengaduan berhasil diperbarui',
      data
    });
  } catch (error) {
    next(error);
  }
}

function updateStatus(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        message: 'ID pengaduan tidak valid'
      });
    }

    const data = pengaduanService.updateStatus(id, req.body?.status);

    return res.status(200).json({
      success: true,
      message: 'Status pengaduan berhasil diperbarui',
      data
    });
  } catch (error) {
    next(error);
  }
}

function remove(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        message: 'ID pengaduan tidak valid'
      });
    }

    const data = pengaduanService.remove(id, req.user);

    return res.status(200).json({
      success: true,
      message: 'Pengaduan berhasil dihapus',
      data
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove
};