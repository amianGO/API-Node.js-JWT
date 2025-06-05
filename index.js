const sequelize = require('./config/db');
const Usuario = require('./entities/user.model');
const Rol = require('./entities/rol.model');
const express = require('express');
const app = express();
const userRoute = require('./routes/user.route');
const auth = require('./routes/auth.route');
const state = require('./routes/state.route');
const brand = require('./routes/brand.route');
const type = require('./routes/equipTypes.route');
const inventory = require('./routes/inventory.route');

console.log('Inciando Aplicacion!!!');
app.use(express.json());
app.use('/api', userRoute);
app.use('/api', auth);
app.use('/api', state);
app.use('/api', brand);
app.use('/api', type);
app.use('/api', inventory);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Corriendo en http://localhost:${PORT}`);
});



