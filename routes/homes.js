/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCasa, traerCasa } = require('../controllers/homes');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get(
    '/:userId', 
    traerCasa 
);
router.post(
    '/new/home', 
    crearCasa 
);








module.exports = router;