const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { findUserByEmail } = require('../repositories/user.repository.cjs');

async function login(email, password) {
    // Mencari pengguna berdasarkan email
    const user = findUserByEmail(email);

    if (!user) {
        return null;
    }

    // Memeriksa password dengan hash
    const passwordValid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordValid) {
        return null;
    }

    // Membuat token JWT
    const token = jwt.sign(
        {
            userId: user.id,
            mahasiswaId: user.mahasiswaId,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        }
    );

    // Mengembalikan data pengguna tanpa password
    return {
        token,
        user: {
            id: user.id,
            mahasiswaId: user.mahasiswaId,
            nama: user.nama,
            email: user.email,
            role: user.role
        }
    };
}

module.exports = {
    login
};