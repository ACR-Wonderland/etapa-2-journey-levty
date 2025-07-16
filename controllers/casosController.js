const casosRepository = require("../repositories/casosRepository")
const errorHandlers = require("../utils/errorHandlers")

const fields = ["titulo", "descricao", "status", "agente_id"]

module.exports = {

    //GET /casos
    getCasos: (req, res) => {
        const query = req.query;
      
        if (Object.keys(query).length > 0) {
          const filtered = casosRepository.filterByQuery(query);
          return res.json(filtered);
        }
      
        const all = casosRepository.findAll();
        return res.json(all);
      },
    //GET /casos/:id
    getCasoById: (req, res) => {
        
        const {id} = req.params
       
        const caso = casosRepository.findById(id)

        if (caso) {
          return res.json(caso)

        } else {
            res.status(404)
            res.json({message: "Caso não encontrado"})
        }
    },
    //POST /casos
    create: (req, res) => {
        const body = req.body
        const isBodyValid = errorHandlers.validateFields(body,fields)
        if(!isBodyValid) {
        
            res.status(400)
            return res.json({message: `O corpo da requisição deve conter os seguintes campos: ${fields}, e devem possuir valores válidos`})

        }
        const newCaso =  casosRepository.append(body)
        res.status(201)
        return res.json(newCaso)
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
               return res.json({message: `O corpo da requisição deve conter os seguintes campos: ${fields}`})
            }

        }
          

        const updatedCaso = casosRepository.update(body, id)
        if(!updatedCaso ) {
            res.status(404)
            return res.json({message: "Caso não encontrado"})
        }
        res.status(200)
        return res.json(updatedCaso)


    },
    deleteById: (req, res) => {
        const { id } = req.params;

        const wasRemoved = casosRepository.remove(id)

        if (wasRemoved) {
        
            return res.status(204).send()

        } else {
            res.status(404)
            return res.json({ message: "Caso não encontrado" })
        }
    }

}