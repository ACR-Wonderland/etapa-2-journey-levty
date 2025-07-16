const agentes = []


module.exports = {
    findAll: () => agentes,

    findById:  (id) => {

        const target =  agentes.find(agente => agente.id == id)
        if(!target) {

            return null
        }
        return target

    },
    append: (agente) =>{
         const id = crypto.randomUUID()
         const newAgente = {

            id: id,
            ...agente,
         }
         agentes.push(newAgente)
         return newAgente
        
    },

    update: (fields, id) => {

        const index = agentes.findIndex(agente => agente.id == id)
        if(index == null || index == undefined) {
            return null
        }
        agentes[index] = {
            ...agentes[index], 
            ...fields       
        };
        return agentes[index];
     },
     remove: (id) => {
        
        const index = agentes.findIndex(agente => agente.id == id)

        if (index !== -1) {
            agentes.splice(index, 1)
            return true
        }
        return false
    }

}