/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCasa, traerCasa, Casas } = require('../controllers/homes');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get(
    '/:userId', 
    Casas.traerCasa 
);
router.post(
    '/new/home', 
    Casas.crearCasa 
);








module.exports = router;