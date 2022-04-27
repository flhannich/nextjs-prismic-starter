import { useState, useRef } from "react";
import { Icons } from '@components/index';
import { autoResize } from '@utils/scripts'

const Message = (props) => {
    const [validationState, setValidationState] = useState(null);
    const textarea = useRef(null);

    const handleChange = e => {
        autoResize(textarea.current);
        
        let valid = true;
        if(props.validation) {
            valid = props.validation(e.target.value)
            setValidationState(valid)
        }
        props.handler(e, valid)
    }


    return (
        <div className="form-textarea">

            <label htmlFor={props.name}>{props.label}</label>
            
            <div className="textarea-holder">

                <textarea 
                    ref={textarea}
                    name={props.name}
                    rows="3" 
                    placeholder={props.placeholder} 
                    defaultValue={props.value} 
                    onChange={handleChange}
                    className={props.hasFormValidationError ? 'has-error' : ''}
                />
            
                {props.value !== '' && validationState === true && 
                    <span className="textarea-success">
                        <Icons
                            name="check"
                            width="16"
                            height="16"
                        />
                    </span>
                }

                {props.hasFormValidationError &&
                    <span className="textarea-error">
                        <Icons
                            name="warn"
                            width="16"
                            height="16"
                        />
                    </span>
                }

            </div>

            {props.hasFormValidationError &&
                <span className="textarea-error-message">
                    {props.errorMessage}
                </span>
            }

        </div>
    )
}

export default Message;

