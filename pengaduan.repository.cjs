// Penyimpanan sementara data pengaduan
let pengaduan = [
    {
        id: 1,
        mahasiswaId: '240104040130',
        judul: 'Lampu ruang kelas mati',
        kategori: 'Fasilitas',
        deskripsi: 'Lampu di ruang kelas tidak menyala.',
        status: 'diajukan',
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        mahasiswaId: '240104040131',
        judul: 'Kendala akses sistem akademik',
        kategori: 'Akademik',
        deskripsi: 'Tidak dapat mengakses sistem akademik.',
        status: 'diproses',
        createdAt: new Date().toISOString()
    }
];

// Mengambil seluruh pengaduan
function findAll() {
    return pengaduan;
}

// Mencari pengaduan berdasarkan ID
function findById(id) {
    return pengaduan.find(item => item.id === id);
}

// Mengambil pengaduan berdasarkan mahasiswa
function findByMahasiswaId(mahasiswaId) {
    return pengaduan.filter(
        item => item.mahasiswaId === mahasiswaId
    );
}

// Menambahkan pengaduan baru
function create(data) {
    const newId = pengaduan.length > 0
        ? Math.max(...pengaduan.map(item => item.id)) + 1
        : 1;

    const newPengaduan = {
        id: newId,
        ...data,
        status: 'diajukan',
        createdAt: new Date().toISOString()
    };

    pengaduan.push(newPengaduan);

    return newPengaduan;
}

// Mengubah data pengaduan
function update(id, data) {
    const index = pengaduan.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    }

    pengaduan[index] = {
        ...pengaduan[index],
        ...data
    };

    return pengaduan[index];
}

// Menghapus pengaduan
function remove(id) {
    const index = pengaduan.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    }

    return pengaduan.splice(index, 1)[0];
}

module.exports = {
    findAll,
    findById,
    findByMahasiswaId,
    create,
    update,
    remove
};