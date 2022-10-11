import { useState, useEffect, useContext, useRef } from "react";
import { FormContext } from '../Form.context';
import { checkProps } from './../Form.lib';
import styles from './Range.module.scss';
import sharedStyles from './../Form.module.scss';

const Range = props => {
    
    const rangeRef = useRef(null);

    const { updateFormData, registerFormData } = useContext(FormContext);

    const [data, setData] = useState({})
    const [valid, setValid] = useState(null);
    const [value, setValue] = useState(props.value);

    
    useEffect(() => {
        setData(checkProps(props));
        // fake e.target to insert defaultValue into formData, even if user didnt interact. If default Value matches user interesst.

    }, []);

    
    useEffect(() => {
        // doesn't need validation
        let defaultValiue = (data.rangeMin + ((data.rangeMax - data.rangeMin) / 2)).toString();

        registerFormData(data.name, defaultValiue, true)
        updateRange();
    }, [data]);


    const handleChange = e => {
        updateRange();
        updateFormData(e, true)            
    }


    const updateRange = () => {
        const ref = rangeRef.current;
        ref.style.backgroundSize = (ref.value - ref.min) * 100 / ( ref.max - ref.min) + '% 100%'
        
        setValue(ref.value);
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
                    ref={rangeRef}
                    type="range"
                    name={data.name}
                    min={data.rangeMin}
                    max={data.rangeMax}
                    onChange={handleChange}
                    className={valid === false ? sharedStyles.hasError : ''}
                />         

                <span className={styles.value}>{value}{data.unit}</span>

            </div>

        </div>
    )
}

export default Range;

