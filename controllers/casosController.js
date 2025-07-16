const casosRepository = require("../repositories/casosRepository")


module.exports = {

    //GET /casos
    getCasos: (req, res) => {
        const casos = casosRepository.findAll()
        res.json(casos)
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
         const fields = req.body
         const newCaso =  casosRepository.append(fields)
         res.status(201)
         return res.json(newCaso)
    },
    updateById: (req, res) => {

        const fields = req.body
        const {id} = req.params

        const updatedCaso = casosRepository.update(fields, id)
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