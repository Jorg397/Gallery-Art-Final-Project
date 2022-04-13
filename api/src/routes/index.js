const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const product = require('./product');


const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/product', product);

module.exports = router;
