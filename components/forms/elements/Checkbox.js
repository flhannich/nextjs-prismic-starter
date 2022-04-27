import { useState } from "react";
import { Icons } from '@components/index';

const Checkbox = (props) => {
  const [validationState, setValidationState] = useState(null);
    
  const handleChange = e => {
    let valid = true;
    if(props.validation) {
        valid = props.validation(e.target.checked)
        setValidationState(valid)
    }
    props.handler(e, valid)
}



  return (
      <div className={`form-checkbox ${props.type === 'marker' ? 'checkbox-marker' : ''} ${props.type === 'switch' ? 'checkbox-switch' : ''} form-${[props.name]} `}>
        <label className={props.hasFormValidationError ? 'has-error' : ''}>
          <input 
            type="checkbox" 
            name={props.name}
            checked={props.checked}
            value={props.value}
            onChange={handleChange}
          
          />

          {props.type === 'switch' && 
            <span className="switch"></span>
          }

          {props.type === 'marker' && 
            <span className="marker">
                <Icons
                    name="check"
                    width="10"
                    height="10"
                />
            </span>
          }
          {props.label}
        </label>
    
        {props.hasFormValidationError &&
              <>
                  <span className="input-error-message">
                      {props.errorMessage}
                  </span>
              </>
          }

      </div>
  )
}
export default Checkbox