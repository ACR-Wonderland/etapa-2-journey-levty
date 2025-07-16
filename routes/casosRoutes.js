const express = require('express');
const casosController = require('../controllers/casosController');
const router = express.Router();

router.get("/casos", casosController.getCasos)
router.get("/casos/:id", casosController.getCasoById)
router.post("/casos",casosController.create )
router.put("/casos/:id", casosController.updateById)
router.patch("/casos/:id", casosController.updateById)
router.delete("/casos/:id", casosController.deleteById)



module.exports = router