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
router.get(
    '/', 
    Casas.traerCasas 
);
router.post(
    '/new/home', 
    Casas.crearCasa 
);
router.put(
    '/delete/:homeId', 
    Casas.eliminarCasa 
);








module.exports = router;