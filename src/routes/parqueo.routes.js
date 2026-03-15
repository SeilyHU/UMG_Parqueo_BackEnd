const express = require('express');
const router = express.Router();
const parqueoController = require('../controllers/parqueo.controller');

router.get('/', parqueoController.getAllParqueos);
router.get('/:id', parqueoController.getParqueoById);
router.post('/', parqueoController.createParqueo);
router.put('/:id', parqueoController.updateParqueo);
router.delete('/:id', parqueoController.deleteParqueo);

module.exports = router;