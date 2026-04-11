const express = require("express");
const router = express.Router();
const controller = require("../controllers/plan_parqueo.controller");

router.get("/", controller.obtenerPlanes);
router.get("/:id", controller.obtenerPlanPorId);
router.post("/", controller.crearPlan);
router.put("/:id", controller.actualizarPlan);

module.exports = router;
