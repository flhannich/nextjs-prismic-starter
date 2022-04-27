import { useState } from "react";
import { Icons } from '@components/index';

const Input = (props) => {
    const [validationState, setValidationState] = useState(null);
    
    const handleChange = e => {
        let valid = true;
        if(props.validation) {
            valid = props.validation(e.target.value)
            setValidationState(valid)
        }
        props.handler(e, valid)
    }

    return (
        
        <div className="form-select">

            {props.label && <label htmlFor={props.name}>{props.label}</label>}

            <div className="select-holder">

                <div className="select-arr-wrapper">

                    <select 
                        type={props.type} 
                        name={props.name} 
                        placeholder={props.placeholder} 
                        defaultValue={props.value || props.name} 
                        onChange={handleChange}
                        className={props.hasFormValidationError ? 'has-error' : ''}
                    >
                        {props.default && <option default value="">{props.default}</option> }
                        {props.options && props.options.map((item, index) => (
                            <option key={index} value={item.value || item.name}>{item.name}</option>
                        ))}
                    </select>

                    {!validationState && !props.hasFormValidationError &&
                        <Icons name="arrow"/>
                    }

                </div>

                {props.value !== '' && validationState === true && 
                    <span className="select-success">
                        <Icons
                            name="check"
                            width="16"
                            height="16"
                        />
                    </span>
                }

                {props.hasFormValidationError &&
                    <span className="select-error">
                        <Icons
                            name="warn"
                            width="16"
                            height="16"
                        />
                    </span>
                }
            </div>
            
            {props.hasFormValidationError &&
                <span className="select-error-message">
                    {props.errorMessage}
                </span>
            }

        </div>
    )
}

export default Input;

