export const validateSingle = (val, optional) => {
    if(optional) {
        return null;
    } else {
        if(val) {
            return true;
        } else {
            return false;
        }
    }
}

export const validateMultiple = (arr, optional) => {
    if(optional) {
        return null;
    } else {
        if(arr.length !== 0) {
            return true;
        } else {
            return false;
        }
    }
}