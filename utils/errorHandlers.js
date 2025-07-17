//TO:DO Campos vazios



function validateFields(requestBody, expectedFields) {

    // Must be an object
    if (typeof requestBody !== "object" || requestBody === null) return false;

    const keys = Object.keys(requestBody);

    // Must have same number of keys
    if (keys.length !== expectedFields.length) return false;

    // Must include ONLY the expected fields
    for (const key of keys) {
        if (!expectedFields.includes(key)) return false;
    }

    // Check if "dataDeIncorporacao" exists and is in valid format
    if(requestBody.hasOwnProperty("dataDeIncorporacao")) {
        
        const date = requestBody["dataDeIncorporacao"];
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) return false;
    }
    

    return true;
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
