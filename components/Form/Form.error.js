
import { FormContext } from './Form.context.js'
import { useContext, useEffect, useState } from 'react';
import styles from "./Form.module.scss";
import { checkForFormErrors } from './Form.lib';

export const Error = ({data}) => {

    const { formData, setFormData } = useContext(FormContext);
    
    const [hasFormErrors, setHasFormErrors] = useState(false);

    useEffect(() => {
        if(formData.hasErrors) {
             // check on each formdata change if still errors exist

            let res = checkForFormErrors(formData, setFormData)        
            setHasFormErrors(res);
        } else {
            setHasFormErrors(formData.hasErrors)
        }
    }, [formData])


    if(hasFormErrors) {

        return (
            <span className={styles.errorMessage}>
                {data}
            </span>
        )

    } else {
        return null;
    }

}

export default Error;
