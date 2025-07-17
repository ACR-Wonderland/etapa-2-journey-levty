//TO:DO Campos vazios



function validateFields(requestBody, expectedFields) {
    // Illegal request body data type
    if(typeof requestBody != "object") return false

    // Invalid format date
    if(requestBody.hasOwnProperty("dataDeIncorporacao")) {
        const date = requestBody["dataDeIncorporacao"]
        

        const regex = /^\d{4}-\d{2}-\d{2}$/;
        //Future date
       


        return regex.test(date);
    }


    // Invalid fields
    for (const key of expectedFields) { 
        if (!requestBody.hasOwnProperty(key)) {
            return false
        }
    }
    

    return true
}

function isSubset(subsetArray, mainArray) {
    if (subsetArray.length > mainArray.length) {
      return false
    }
  
    return subsetArray.every(element => mainArray.includes(element))
  }
module.exports = {
    validateFields,
    isSubset
}
