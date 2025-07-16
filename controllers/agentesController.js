const agentesRepository = require("../repositories/agentesRepository")
const errorHandlers = require("../utils/errorHandlers")

const fields = ["nome", "dataDeIncorporacao", "cargo"]

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

        if (agente) {
          return res.json(agente)

        } else {
            res.status(404)
            res.json({message: "Agente não encontrado"})
        }
    },
    //POST /agentes
    create: (req, res) => {
         const body = req.body
         const isBodyValid = errorHandlers.validateFields(body,fields)
         if(!isBodyValid) {
            
            res.status(400)
            return res.json({message: `O corpo da requisição deve conter os seguintes campos: ${fields}`})

         }
         const newAgente =  agentesRepository.append(body)
         res.status(201)
         return res.json(newAgente)
    },
    updateById: (req, res) => {

        const body = req.body
        const {id} = req.params

        if(req.method == "PATCH") {

            const keysArray = Object.keys(body)
            if(!errorHandlers.isSubset(keysArray,fields)) {
                res.status(400)
                return res.json({message: "Atributos inválidos"})
            }
        //PUT
        } else {

            const isBodyValid = errorHandlers.validateFields(body, fields)
            if(!isBodyValid) {
                res.status(400)
                res.json({message: `O corpo da requisição deve conter os seguintes campos: ${fields}`})
            }

        }
            
        const updatedAgente = agentesRepository.update(body, id)
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
