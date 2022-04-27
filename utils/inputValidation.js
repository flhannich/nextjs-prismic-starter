
export const validateRange = val => {
    return true;
}

export const validateSelect = val => {
    if(val) {
        return true;
    } else {
        return false;
    }
}

export const validateEmail = val => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; //check if @ an . exists

    if(val !== '' && val.match(regex)) {
        return true;
    } else {
        return false;
    }
}

export const validateName = val => {
    const regex = /\s/; //check if whitespace exists

    if(val !== '' && val.match(regex)) {
        return true;
    } else {
        return false;
    }
}

export const validatePhone = val => {
    const regex = /^[0-9 +]{1,30}$/; //check if value has only numbers

    if(val !== '' && val.match(regex)) {
        return true;
    } else {
        return false;
    }
}

export const validateMessage = val => {

    if(val !== '' && val.length > 5) { // check if messages is at least n long
        return true;
    } else {
        return false;
    }
}

export const validateLegal = val => {
    if(val) {
        return true;
    } else {
        return false;
    }
}
