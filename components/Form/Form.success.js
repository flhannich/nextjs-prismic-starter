
import { FormContext } from './Form.context.js'
import { useContext } from 'react';
import styles from "./Form.module.scss";

export const Success = ({title, description}) => {

    const { formData } = useContext(FormContext);

    if(formData.sent && !formData.hasErrors) {

        return (
            <div className={styles.successMessage}>
                <h6>{title}</h6>
                <span>{description}</span>
            </div>
        )

    } else {
        return null;
    }

}

export default Success;
