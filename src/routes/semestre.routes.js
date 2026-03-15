const express = require('express');
const router = express.Router();
const semestreController = require('../controllers/semestre.controller');

router.get('/', semestreController.getAllSemestres);
router.get('/:id', semestreController.getSemestreById);
router.post('/', semestreController.createSemestre);
router.put('/:id', semestreController.updateSemestre);
router.delete('/:id', semestreController.deleteSemestre);

module.exports = router;