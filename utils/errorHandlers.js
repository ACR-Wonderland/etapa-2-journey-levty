//TO:DO Campos vazios
function getTodayDate () {
  const today = new Date();

  // Get year
  const year = today.getFullYear();

  // Get month (0-indexed, so add 1) and pad with leading zero if necessary
  const month = (today.getMonth() + 1).toString().padStart(2, '0');

  // Get day of the month and pad with leading zero if necessary
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

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
        
        const today = getTodayDate()
        if(today < date) return false
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


