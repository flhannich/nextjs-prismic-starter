export const validate = (val, optional) => {
    if(optional) {
        if(val === '' || val === undefined) {
            return null;
        } else {
            if(val.length > 5) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        if(val.length > 5) {
            return true;
        } else {
            return false;
        }
    }
}


export const autoResize = el => {
    el.style.height = "auto";
    el.style.height = (el.scrollHeight) + "px";
}