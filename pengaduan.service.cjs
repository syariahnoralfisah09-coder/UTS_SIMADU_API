
const pengaduanRepository = require('../repositories/pengaduan.repository.cjs');

function buatError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validasiData(data) {
  const allowedFields = ['judul', 'kategori', 'deskripsi'];

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw buatError(400, 'Data pengaduan tidak valid');
  }

  const fields = Object.keys(data);

  if (fields.some(field => !allowedFields.includes(field))) {
    throw buatError(400, 'Terdapat field yang tidak diizinkan');
  }

  if (
    typeof data.judul !== 'string' ||
    !data.judul.trim() ||
    typeof data.kategori !== 'string' ||
    !['Fasilitas', 'Akademik', 'TI'].includes(data.kategori) ||
    typeof data.deskripsi !== 'string' ||
    !data.deskripsi.trim()
  ) {
    throw buatError(400, 'Judul, kategori, dan deskripsi wajib diisi dengan benar');
  }

  return {
    judul: data.judul.trim(),
    kategori: data.kategori,
    deskripsi: data.deskripsi.trim()
  };
}

function getAll(user) {
  if (user.role === 'admin') {
    return pengaduanRepository.findAll();
  }

  return pengaduanRepository.findByMahasiswaId(user.mahasiswaId);
}

function getById(id, user) {
  const item = pengaduanRepository.findById(id);

  if (!item) {
    throw buatError(404, 'Pengaduan tidak ditemukan');
  }

  if (user.role !== 'admin' && item.mahasiswaId !== user.mahasiswaId) {
    throw buatError(403, 'Anda tidak boleh melihat pengaduan milik mahasiswa lain');
  }

  return item;
}

function create(user, data) {
  if (user.role !== 'mahasiswa') {
    throw buatError(403, 'Hanya mahasiswa yang dapat membuat pengaduan');
  }

  const validData = validasiData(data);

  return pengaduanRepository.create({
    mahasiswaId: user.mahasiswaId,
    ...validData
  });
}

function update(id, user, data) {
  const item = pengaduanRepository.findById(id);

  if (!item) {
    throw buatError(404, 'Pengaduan tidak ditemukan');
  }

  if (user.role !== 'mahasiswa' || item.mahasiswaId !== user.mahasiswaId) {
    throw buatError(403, 'Anda tidak boleh mengubah pengaduan ini');
  }

  if (item.status !== 'diajukan') {
    throw buatError(403, 'Pengaduan yang sudah diproses tidak dapat diubah');
  }

  const validData = validasiData(data);

  return pengaduanRepository.update(id, validData);
}

function updateStatus(id, status) {
  const item = pengaduanRepository.findById(id);

  if (!item) {
    throw buatError(404, 'Pengaduan tidak ditemukan');
  }

  if (!['diajukan', 'diproses', 'selesai'].includes(status)) {
    throw buatError(400, 'Status pengaduan tidak valid');
  }

  return pengaduanRepository.update(id, { status });
}

function remove(id, user) {
  const item = pengaduanRepository.findById(id);

  if (!item) {
    throw buatError(404, 'Pengaduan tidak ditemukan');
  }

  if (user.role !== 'mahasiswa' || item.mahasiswaId !== user.mahasiswaId) {
    throw buatError(403, 'Anda tidak boleh menghapus pengaduan ini');
  }

  if (item.status !== 'diajukan') {
    throw buatError(403, 'Pengaduan yang sudah diproses tidak dapat dihapus');
  }

  return pengaduanRepository.remove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove
};