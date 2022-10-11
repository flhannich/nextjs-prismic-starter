import { useState, useEffect, useContext } from "react";
import { FormContext } from '../Form.context';
import { validate, getInputType } from './Input.lib';
import { checkProps } from './../Form.lib';
import { Icons } from '@components/index';
import styles from './Input.module.scss';
import sharedStyles from './../Form.module.scss';

const Input = props => {
        
    const { updateFormData, registerFormData, formData } = useContext(FormContext);
    const [data, setData] = useState({})
    const [isMissing, setIsMissing] = useState(null);
    const [hasError, setHasError] = useState(null);
    const [isValid, setIsValid] = useState(null);


    useEffect(() => 
        setData(checkProps(props))
    , []);

    useEffect(() =>  {
        registerFormData(data.name, '', null)
    }, [data]);


    useEffect(() =>  {
        setIsMissing (
            formData.hasErrors && 
            !data.optional && 
            !formData.data[data.name]?.valid
        ) 

        setHasError(
            formData.data[data.name]?.valid === false
        )
        setIsValid(
            formData.data[data.name]?.valid === true
        )
    }, [formData]);


    const handlerBlur = e => {        
        update(e)
    }

    const handleChange = e => {
        if(hasError || formData.hasErrors) 
            update(e)
    }

    const update = e => {
        let isValid = validate(e.target.value, data.type, data.optional)
    
        updateFormData(e, isValid)
    }


    return (

        <div className={styles.container}>

            <label htmlFor={data.name}>
                {data.label}
                {data.optional && 
                    <span className={sharedStyles.optional}>
                        Optional
                    </span>
                }
             </label>



            <div className={styles.holder}>

                <input 
                    type={getInputType(data.type)}
                    name={data.name} 
                    placeholder={data.placeholder} 
                    onBlur={handlerBlur}
                    onChange={handleChange}
                    pattern={`${data.type === 'phone' ? '[0-9]{3}-[0-9]{3}-[0-9]{4}' : false}`}
                />
            

                {isValid &&
                    <span className={sharedStyles.successMarker}>
                        <Icons
                            name="check"
                            width="16"
                            height="16"
                        />
                    </span>
                }

                {hasError && 
                    <span className={sharedStyles.errorMarker}>
                        <Icons
                            name="warn"
                            width="16"
                            height="16"
                        />
                    </span>
                }

            </div>
            

            {hasError && !isMissing &&
                <span className={sharedStyles.errorMessage}>
                    {data.error_message_failed}
                </span>
            }

            { isMissing &&
                <span className={sharedStyles.errorMessage}>
                    {data.error_message_missing}
                </span>
            }

        </div>
    )
}

export default Input;

