const agentesRepository = require("../repositories/agentesRepository")
const Validator = require("../utils/errorHandlers")
const fields = ["nome", "dataDeIncorporacao", "cargo"]
const validator = new Validator(fields)
module.exports = {

    //GET /agentes
    getAgentes: (req, res) => {
        const query = req.query;
      
        if (Object.keys(query).length > 0) {
          const filtered = agentesRepository.filterByQuery(query);
          return res.json(filtered);
        }
      
        const all = agentesRepository.findAll();
        return res.json(all);
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
         const isBodyValid = validator.validateFields(body)
         if(!isBodyValid) {
            
            res.status(400)
            return res.json({message: validator.errorMessage})

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
            if(!Validator.isSubset(keysArray,fields)) {
                res.status(400)
                return res.json({message: "Campo(s) inválido(s)"})
            }
        //PUT
        } else {

            const isBodyValid = validator.validateFields(body)
            if(!isBodyValid) {
                res.status(400)
                return  res.json({message: validator.errorMessage})
            }

        }
            
        const updatedAgente = agentesRepository.update(body, id)
        if(!updatedAgente ) {
            res.status(404)
            return res.json({message: "Agente não encontrado"})
        } else {
            res.status(200)
            return res.json(updatedAgente)
        }
        


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