const express = require('express')
const router = express.Router();
const agentesController = require("../controllers/agentesController")

router.get("/agentes", agentesController.getAgentes)
router.get("/agentes/:id", agentesController.getAgenteById)
router.post("/agentes",agentesController.create )
router.put("/agentes/:id", agentesController.updateById)
router.patch("/agentes/:id", agentesController.updateById)
router.delete("/agentes/:id", agentesController.deleteById)





module.exports = router