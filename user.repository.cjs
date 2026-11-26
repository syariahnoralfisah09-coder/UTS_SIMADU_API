const bcrypt = require('bcryptjs');

// Data awal pengguna SIMADU
const users = [
    {
        id: 1,
        mahasiswaId: '240104040130',
        nama: 'Mahasiswa SIMADU',
        email: 'mahasiswa@simadu.ac.id',
        passwordHash: bcrypt.hashSync('Mhs12345!', 10),
        role: 'mahasiswa'
    },
    {
        id: 2,
        mahasiswaId: '240104040131',
        nama: 'Mahasiswa Kedua',
        email: 'mahasiswa2@simadu.ac.id',
        passwordHash: bcrypt.hashSync('Mhs12345!', 10),
        role: 'mahasiswa'
    },
    {
        id: 3,
        mahasiswaId: null,
        nama: 'Administrator SIMADU',
        email: 'admin@simadu.ac.id',
        passwordHash: bcrypt.hashSync('Admin12345!', 10),
        role: 'admin'
    }
];

// Mengambil seluruh data pengguna
function findAllUsers() {
    return users;
}

// Mencari pengguna berdasarkan email
function findUserByEmail(email) {
    return users.find(user => user.email === email);
}

// Mencari pengguna berdasarkan ID
function findUserById(id) {
    return users.find(user => user.id === id);
}

module.exports = {
    findAllUsers,
    findUserByEmail,
    findUserById
};