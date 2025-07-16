const agentesRepository = require("../repositories/agentesRepository")


module.exports = {

    //GET /agentes
    getAgentes: (req, res) => {
        const agentes = agentesRepository.findAll()
        res.json(agentes)
    },
    //GET /agentes/:id
    getAgenteById: (req, res) => {
        
        const {id} = req.params
        const agente = agentesRepository.findById(id)

        if (agents) {
          return res.json(agentes)

        } else {
            res.status(404)
            res.json({message: "Agente não encontrado"})
        }
    },
    //POST /agentes
    create: (req, res) => {
         const fields = req.body
         const newAgente =  agentesRepository.append(fields)
         res.status(201)
         return res.json(newAgente)
    },
    updateById: (req, res) => {

        const fields = req.body
        const {id} = req.params

        const updatedAgente = agentesRepository.update(fields, id)
        if(!updatedAgente ) {
            res.status(404)
            return res.json({message: "Agente não encontrado"})
        }
        res.status(200)
        return res.json(updatedAgente)


    },
    deleteById: (req, res) => {
        const { id } = req.params;

        const wasRemoved = agentesRepository.remove(id)

        if (wasRemoved) {
        
            return res.status(204).send()

        } else {
            res.status(404)
            return res.json({ message: "Agente não encontrado" })
        }
    }

}