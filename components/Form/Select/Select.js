import { useState, useEffect, useContext } from "react";
import { FormContext } from '../Form.context';
import { validateSingle, validateMultiple } from './Select.lib';
import { checkProps } from './../Form.lib';
import { Icons } from '@components/index';
import styles from './Select.module.scss';
import sharedStyles from './../Form.module.scss';
import SelectSingle from './Select.single';
import SelectMultiple from './Select.multiple';
 
const Select = props => {
        
    const { updateFormData, registerFormData, formData } = useContext(FormContext);
    const [data, setData] = useState({})
    const [isMissing, setIsMissing] = useState(null);
    const [hasError, setHasError] = useState(null);
    const [isValid, setIsValid] = useState(null);
    
    useEffect(() => 
        setData(checkProps(props))
    , []);


    useEffect(() => {  
        if(!data.items) return

        // let defaultValiue = data.multiple ? '' : data.items[0].value;
        registerFormData(data.name, '', data.optional ? true : false)
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


    const handleMultipleChange = obj => {
        let res = validateMultiple(obj.value, data.optional)

        updateFormData(obj, res)
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

            <div className={`${styles.holder} ${data.multiple ? styles.multiple : styles.single}`}>

                {data.multiple 
                    ?   <SelectMultiple 
                            data={data} 
                            valid={formData.data[data.name]?.valid} 
                            handler={handleMultipleChange}
                        />

                    :   
                        <SelectSingle
                            data={data} 
                        />
                }
                
                {!data.multiple &&
                    <div className={sharedStyles.symbol}>
                        <Icons name="arrow"/>
                    </div>
                }

            </div>
            

            { isMissing &&
                <span className={sharedStyles.errorMessage}>
                    {data.error_message_missing}
                </span>
            }

        </div>
    )
}

export default Select;

