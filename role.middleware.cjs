function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {

        // Memastikan pengguna sudah terautentikasi
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Autentikasi diperlukan'
            });
        }

        // Memeriksa hak akses berdasarkan role
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Anda tidak memiliki hak akses'
            });
        }

        next();
    };
}

module.exports = {
    authorizeRoles
};