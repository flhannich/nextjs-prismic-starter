import { useState, useEffect, useContext, useRef } from "react";
import { FormContext } from '../Form.context';
import { validate } from './Date.lib';
import { checkProps } from './../Form.lib';
import styles from './Date.module.scss';
import sharedStyles from './../Form.module.scss';
import DateSelect from './Date.select';
import Modal from './../Form.modal';
import { Icons } from '@components/index';

const Date = props => {
    
    const { updateFormData, registerFormData, formData } = useContext(FormContext);

    const inputRef = useRef(null);

    const [modalState, setModalState] = useState(false);
    const [data, setData] = useState({})
    const [isMissing, setIsMissing] = useState(null);
    const [hasError, setHasError] = useState(null);
    const [isValid, setIsValid] = useState(null);
    
        
    useEffect(() => 
        setData(checkProps(props))
    , []);


    useEffect(() => {  
        if(!data.items) return

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
    

    const handleChange = e => {
        let res = validate(e.target.value, data.optional)
        updateFormData(e, res)
    }

    
    const handleDateSelect = date => {
        let obj = {
            name: data.name,
            value: date
        }
        inputRef.current.value = date;
        let res = validate(date, data.optional)
        updateFormData(obj, res)
    }

    const handleClick = () => {
        setModalState(!modalState);
    }

    const preventKeys = e => {
        e.preventDefault()
    }
    
    const resetDateSelection = () => {
        handleDateSelect('')
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


            <div className={`${styles.holder} ${data.multiple ? styles.multiple : ''}`}>
                    
                    <input 
                        ref={inputRef}
                        type="text"
                        placeholder={data.placeholder}
                        onClick={handleClick}
                        onChange={handleChange}
                    />
                    
                    {formData.data[data.name]?.message === ''
                    ?   <div className={sharedStyles.symbol}>
                            <Icons name="arrow"/>
                        </div>
                    :    <div 
                            className={sharedStyles.reset}
                            onClick={resetDateSelection}
                        >
                           <Icons name="close"/>
                        </div>
                    }
                    
                
                    <Modal
                        state={modalState}
                        setState={setModalState}
                        style="date"
                    >
                        <DateSelect 
                            handler={handleDateSelect} 
                            setState={setModalState}
                        />
                    </Modal>

            </div>
            

            { isMissing &&
                <span className={sharedStyles.errorMessage}>
                    {data.error_message_missing}
                </span>
            }

        </div>
    )
}

export default Date;

