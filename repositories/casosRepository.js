const casos = []


module.exports = {
    findAll: () => casos,

    findById:  (id) => {

        const target =  casos.find(caso => caso.id == id)
        if(!target) {

            return null
        }
        return target

    },
    append: (caso) =>{
         const id = crypto.randomUUID()
         const newCaso = {
            id: id,
            ...caso,
         }
         console.log(newCaso)
         casos.push(newCaso)
         return newCaso
        
    },

    update: (fields, id) => {

        const index = casos.findIndex(caso => caso.id == id)
        if(index == null || index == undefined) {
            return null
        }
        casos[index] = {
            ...casos[index], 
            ...fields       
        };
        return casos[index];
     },
     remove: (id) => {
        
        const index = casos.findIndex(caso => caso.id == id)

        if (index !== -1) {
            casos.splice(index, 1)
            return true
        }
        return false
    }

}