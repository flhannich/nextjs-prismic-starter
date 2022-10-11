export const validate = (val, optional) => {
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