require('dotenv').config();

const app = require('./app.cjs');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server SIMADU API berjalan di http://localhost:${PORT}`);
});