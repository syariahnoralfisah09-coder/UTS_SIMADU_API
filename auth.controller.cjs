const authService = require('../services/auth.service.cjs');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        // Validasi input
        if (
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: 'Email dan password wajib diisi dengan benar'
            });
        }

        // Memproses login
        const result = await authService.login(
            email.trim(),
            password
        );

        // Login gagal
        if (!result) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password salah'
            });
        }

        // Login berhasil
        return res.status(200).json({
            success: true,
            message: 'Login berhasil',
            data: result
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    login
};