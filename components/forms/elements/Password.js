import { useState } from "react";
import { Icons, Button } from '@components/index';

const Password = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [validationState, setValidationState] = useState(null);

    const handleChange = e => {
        let valid = true;
        if(props.validation) {
            valid = props.validation(e.target.value)
            setValidationState(valid)
        }
        props.handler(e, valid)
    }

    const handleClick = e => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible)
    }

    return (
        <div className="form-password">

            <label htmlFor={props.name}>{props.label}</label>

            <div className="password-holder">

                <span className="password-icon">
                    <Button
                        handler={(e) => handleClick(e)}
                        icon={passwordVisible ? 'visible' : 'hidden'}
                        label={null}
                    >
                    </Button>
                </span>


                <input 
                    type={passwordVisible ? 'text' : 'password'} 
                    name={props.name} 
                    placeholder={props.placeholder} 
                    defaultValue={props.value} 
                    onKeyDown={handleChange}
                    className={props.hasFormValidationError ? 'has-error' : ''}
                />

                {props.description &&
                    <span className="password-description" dangerouslySetInnerHTML={{ __html: props.description }}></span>
                }




                {props.value !== '' && validationState === true && 
                    <span className="password-success">
                        <Icons
                            name="check"
                            width="16"
                            height="16"
                        />
                    </span>
                }

                {props.hasFormValidationError &&
                    <span className="password-error">
                        <Icons
                            name="warn"
                            width="16"
                            height="16"
                        />
                    </span>
                }
            </div>
            
            {props.hasFormValidationError &&
                <span className="password-error-message">
                    {props.errorMessage}
                </span>
            }

        </div>
    )
}

export default Password;

