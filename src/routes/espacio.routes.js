const express = require('express');
const router = express.Router();
const espacioController = require('../controllers/espacio.controller');

router.get('/', espacioController.getAllEspacios);
router.get('/parqueo/:parqueoId', espacioController.getEspaciosByParqueo);
router.post('/', espacioController.createEspacio);
router.put('/:id', espacioController.updateEspacio);
router.delete('/:id', espacioController.deleteEspacio);

module.exports = router;