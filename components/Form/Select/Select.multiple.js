import sharedStyles from '../Form.module.scss';
import { Icons } from '@components/index';
import { useState, useEffect } from 'react';

const SelectMultiple = ({data, valid, handler}) => {
    
    const [arr, setArr] = useState([]);

    const testHandler = e => {

        let name =  e.target.name,
            res = [];

        if(arr.includes(name)) {
            res = arr.filter(function(item) {
                return item !== name
            })
        } else {
            res = [...arr, name]
        }

        handler({
            name: data.name,
            value: res
        });

        setArr(res);
    }


    return (

        <div className={`${valid === false ? sharedStyles.hasError : ''} ${sharedStyles[data.style]}`} >
        

        {data.items && data.items.map((item, index) => (

            <label key={index} htmlFor={item.value}>

            <input 
                type="checkbox" 
                name={item.value}
                checked={item.checked}
                onChange={testHandler}
            />

            {data.style === 'switch' && 
                <span 
                    className={` ${sharedStyles.checkbox} ${valid === false ? sharedStyles.hasError : ''}`}
                ></span>
            }

            {data.style === 'checkmark' && 
                <span 
                    className={` ${sharedStyles.checkbox} ${valid === false ? sharedStyles.hasError : ''}`}
                >
                    <Icons
                        name="check"
                        width="10"
                        height="10"
                    />
                </span>
            }
            {item.name}

            </label>

            // <option key={index} value={item.value || item.name}>{item.name}</option>

        ))}

        </div>

    )
}

export default SelectMultiple;