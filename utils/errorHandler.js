class Validator {
    constructor(expectedFields = []) {
      this.expectedFields = expectedFields;
      this.errorMessage = ""
    }
    #isValueValid (property, body) {
         if (property == "status") {
            if (body.status !== "aberto" && body.status !== "solucionado") {
                this.errorMessage = "Campo 'status' só pode possuir os valores: 'aberto', 'solucionado'"
                return false
            }
  }
    return true
}
    #isValueEmpty(requestBody) {

        const payloadArray = Object.entries(requestBody)
        for(const index in payloadArray) {
            if(payloadArray[index][1] === "") {
                 this.errorMessage = `Campo '${payloadArray[index][0]}' não pode ser vazio`
                return true
            }
        }
    }
  
    #getTodayDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = (today.getMonth() + 1).toString().padStart(2, '0')
      const day = today.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    validateFields(requestBody) {
      if (typeof requestBody !== "object" || requestBody === null){ 
        this.errorMessage = "Corpo da Requisição deve ser um objeto"
        return false
    };
  
      const keys = Object.keys(requestBody);
      

      if (keys.sort().join(",") !== this.expectedFields.sort().join(",")){
         this.errorMessage = `Os campos do payload devem ser: ${this.expectedFields.join(" , ")}`
         return false
        }
      
      
      if(this.#isValueEmpty(requestBody)) return false

      if(keys.includes("cargo")) {
       if ( !this.#isValueValid("cargo", requestBody)) return false
      }
      if(keys.includes("status")) {
        if ( !this.#isValueValid("status", requestBody)) return false
       }
  
      if (requestBody.hasOwnProperty("dataDeIncorporacao")) {
        const date = requestBody["dataDeIncorporacao"]
        const regex = /^\d{4}-\d{2}-\d{2}$/
        if (!regex.test(date)) {
            this.errorMessage = "Data deve estar no seguinte formato: 'YYYY-MM-DD' "
            return false
        };
  
        const today = this.#getTodayDate();
        if (today < date) {
            this.errorMessage = "dataDeIncorporacao não pode ser uma data futura"
            return false
        };
      }
  
      return true;
    }
  
    static isSubset(subsetArray, mainArray) {
      if (subsetArray.length > mainArray.length) return false;
      return subsetArray.every(element => mainArray.includes(element));
    }
  }
  
  module.exports = Validator;
  
