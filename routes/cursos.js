const { Router } = require('express');
const { check } = require('express-validator');
const { cursosGet, cursoGet, cursoPost, cursoPut, cursoDelete } = require('../controllers/cursos');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { cursoExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', cursosGet);

router.get ('/:id',[
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(cursoExiste),
    validarCampos,
],
    cursoGet
);

router.post(
    "/",
    [
      validarJWT,
      esAdminRole,
      check("nombre", "El nombre es obligatorio").notEmpty(),
      validarCampos,
    ],
    cursoPost
  );

  router.put(
    "/:id",
    [
      validarJWT,
      esAdminRole,
      check("id", "El id no es válido").isMongoId(),    
      check("id").custom(cursoExiste),
      validarCampos,
    ],
    cursoPut
  );

  router.delete(
    "/:id",
    [
      validarJWT,
      esAdminRole,
      check("id", "El id no es válido").isMongoId(),    
      check("id").custom(cursoExiste),
      validarCampos,
    ],
    cursoDelete
  );
  
  module.exports = router;