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
        <div className="form-input">

            <label htmlFor={props.name}>{props.label}</label>

            <div className="input-holder">

                <input 
                    type={props.type} 
                    name={props.name} 
                    placeholder={props.placeholder} 
                    defaultValue={props.value} 
                    onChange={handleChange}
                    className={props.hasFormValidationError ? 'has-error' : ''}
                />

                {props.value !== '' && validationState === true && 
                    <span className="input-success">
                        <Icons
                            name="check"
                            width="16"
                            height="16"
                        />
                    </span>
                }

                {props.hasFormValidationError &&
                    <span className="input-error">
                        <Icons
                            name="warn"
                            width="16"
                            height="16"
                        />
                    </span>
                }
            </div>
            
            {props.hasFormValidationError &&
                <span className="input-error-message">
                    {props.errorMessage}
                </span>
            }

        </div>
    )
}

export default Input;

