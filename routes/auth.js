const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { login } = require('../controllers/auth');


const router = Router();

router.post('/login',
  [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
  ],
  login  
);

module.exports = router;