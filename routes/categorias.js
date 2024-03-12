const { Router } = require('express');
const { check } = require('express-validator');
const { categoriasGet, categoriaGet, categoriaPost, categoriaPut, categoriaDelete } = require('../controllers/categorias');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { categoriaExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', [
  validarJWT
], 
  categoriasGet
);

router.get('/:id', [
  validarJWT,
  check('id', 'No es un Id válido').isMongoId(),
  check('id').custom(categoriaExiste),
  validarCampos
], 
  categoriaGet
);

router.post('/',
  [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
  ],
  categoriaPost);

router.put('/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
  ],
   categoriaPut);

router.delete('/:id', 
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
  ],
  categoriaDelete);

module.exports = router;