import { useState, useEffect, useContext } from "react";
import { Icons } from '@components/index';
import { validate } from './Checkbox.lib';
import { checkProps } from './../Form.lib';
import styles from './Checkbox.module.scss';
import sharedStyles from './../Form.module.scss';
import { FormContext } from '../Form.context';

const Checkbox = props => {

  const { updateFormData, registerFormData, formData } = useContext(FormContext);
  const [data, setData] = useState({})
  const [isMissing, setIsMissing] = useState(null);

  useEffect(() => 
    setData(checkProps(props))
  ,[]);


  useEffect(() =>  
    registerFormData(data.name, false, data.optional ? true : false)
  ,[data]);


  useEffect(() =>  {
    setIsMissing (
        formData.hasErrors && 
        !data.optional && 
        !formData.data[data.name]?.valid
    ) 
}, [formData]);


  const handleChange = e => {
      let isValid = validate(e.target.checked, data.optional);
      updateFormData(e, isValid);
  }


  return (

      <div className={`${styles.container} ${sharedStyles[data.style]}`}>



        <label htmlFor={data.name}>

          <input 
            type="checkbox" 
            name={data.name}
            checked={data.checked}
            onChange={handleChange}
          />

          {data.style === 'switch' && 
            <span 
              className={sharedStyles.checkbox}
            ></span>
          }

          {data.style === 'checkmark' && 
            <span 
              className={sharedStyles.checkbox}
            >
                <Icons
                    name="check"
                    width="10"
                    height="10"
                />
            </span>
          }
          
          {data.label}

          {data.optional && 
              <span className={sharedStyles.optional}>
                  Optional
              </span>
          }

        </label>

        { isMissing &&
              <span className={sharedStyles.errorMessage}>
                  {data.error_message_missing}
              </span>
          }

      </div>
  )
}

export default Checkbox