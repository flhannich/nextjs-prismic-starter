
export const validate = (val, type, optional) => {

        let regex;

        if(type === 'email') 
            regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; //check if @ an . exists
        
        else if(type === 'name') 
            regex = /\s/; //check if whitespace exists
        
        else if(type === 'phone') 
            regex = /^[0-9 +]{1,30}$/; //check if value has only numbers
        else 
            regex = null;
        
        if(optional) {
            if(val === '' || val === undefined) {
                return null;
            } else {
                if(regex && val.match(regex)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            if(regex && val.match(regex)) {
                return true;
            } else {
                return false;
            }
        }
}

export const getInputType = type => {
    if(type === 'phone') 
        return 'tel'
    else if(type === 'email') 
        return 'email'
    else return 'text'
}