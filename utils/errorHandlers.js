function validateFields(requestBody, expectedFields) {
    // Illegal request body data type
    if(typeof requestBody != "object") return false

    // Invalid format date
    if(requestBody.hasOwnProperty("dataDeIncorporacao")) {
        const date = requestBody["dataDeIncorporacao"]
        

        const regex = /^\d{4}-\d{2}-\d{2}$/;
        //Future date
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        if(date !== formattedDate) {
            return false 
        }


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