function validateNumber(num){
    const number = parseInt(num);

    if (Number.isNaN(number)) {
        return {
            operation: false,
            message: "not Integer"
        };
    }
    if(number <= 0)
        return {
            operation:  false,
            message:    "can't 0 or negative"
        }
    
    if(number > 99999)
        return {
            operation:  false,
            message:    "can't exceed 99999"
        }
    
    return {
        operation:  true
    }
}

module.exports = {validateNumber}