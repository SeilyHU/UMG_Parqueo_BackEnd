const express = require('express');
const router = express.Router();
const estudianteMultaController = require('../controllers/estudiante_multa.controller'); 

// Rutas CRUD básicas
router.get('/', estudianteMultaController.getAllEstudianteMulta);
router.get('/:multa_id/:estudiante_id', estudianteMultaController.getEstudianteMultaById);
router.get('/estudiante/:estudiante_id', estudianteMultaController.getEstudianteMultaByEstudianteId);
router.get('/multa/:multa_id', estudianteMultaController.getEstudianteMultaByMultaId);
router.post('/', estudianteMultaController.createEstudianteMulta);
router.put('/:multa_id/:estudiante_id', estudianteMultaController.updateEstudianteMulta);
router.delete('/:multa_id/:estudiante_id', estudianteMultaController.deleteEstudianteMulta);

module.exports = router;