import { useState, useRef, useEffect } from "react";
import { Icons } from '@components/index';

const Range = (props) => {

    const inputRef = useRef(null);

    const [validationState, setValidationState] = useState(null);
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        updateRange();
    },[]);

    const handleChange = e => {
        updateRange();
        let valid = true;
        if(props.validation) {
            valid = props.validation(inputRef.current.value)
            setValidationState(valid)
        }
        props.handler(e, valid)
    }

    const updateRange = () => {
        const ref = inputRef.current;
        ref.style.backgroundSize = ( ref.value - ref.min) * 100 / ( ref.max - ref.min) + '% 100%'

        setValue(ref.value);
      }

    return (
        <div className="form-range">

            <div className="range-label">
                <label htmlFor={props.name}>{props.label}</label>
            </div>

            <div className="range-holder">
                <input 
                    ref={inputRef}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    min={props.min}
                    max={props.max}
                    defaultValue={props.value}
                    onChange={handleChange}
                    className={props.hasFormValidationError ? 'has-error' : ''}
                />            

                <span className="type-category">{value}{props.unit}</span>

                {props.value !== '' && validationState === true &&
                    <span className="range-success">
                        <Icons
                            name="check"
                            width="16"
                            height="16"
                        />
                    </span>
                }

                {props.hasFormValidationError &&
                    <span className="range-error">
                        <Icons
                            name="warn"
                            width="16"
                            height="16"
                        />
                    </span>
                }
            </div>
            
            {props.hasFormValidationError &&
                <span className="range-error-message">
                    {props.errorMessage}
                </span>
            }

        </div>
    )
}

export default Range;

