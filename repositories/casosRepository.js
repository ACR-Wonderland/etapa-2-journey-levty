const casos = []


module.exports = {
    findAll: () => casos,

    findById:   async  (id)  => {
        const target =  casos.find(caso => caso.id == id)

        if(!target) {

            return null
        }

        
        return target

    },
    filterByQuery: (query) => {
        return casos.filter(caso => {
          return Object.entries(query).every(([key, value]) => {
            if (!caso.hasOwnProperty(key)) return false
      
            const casoValue = String(caso[key]).toLowerCase()
            const queryValue = String(value).toLowerCase()
      
            return casoValue.includes(queryValue)
          });
        });
      },
    append: (caso) =>{
         const id = crypto.randomUUID()
         const newCaso = {
            id: id,
            ...caso,
         }
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