
import { Button } from '@components/index';
import { useContext, useEffect, useState } from 'react';
import { FormContext } from './Form.context';
import { send } from './Form.lib';

const Submit = props => {
    
    const { formData, setFormData } = useContext(FormContext);
    const [url, setUrl] = useState(null);
    
    useEffect(() => {
        setUrl(window.location.origin);
        console.log(window.location.origin);
    },[])
    
    const handler = e => {
        e.preventDefault();

        if(props.type === 'contact') 
            send(`${url}/api/functions/sendmail`, formData, setFormData);

        else if(props.type === 'subscribe') 
            send(`${url}/api/functions/subscribe`, formData, setFormData);

        else 
            return false;

    }

    return (

        <Button 
            type="submit"
            classname={props.variant === 'contact' ? 'cta' : 'icon'}
            handler={(e) => handler(e)}
            icon={props.variant === 'contact' ? false : 'arrow'}
        >
            { props.variant === 'contact' && 
                <>
                    {props.sending 
                        ?  <>Sending....</>
                        :  <>{props.label}</>
                    }
                </>
            }
        </Button>

    )
}

export default Submit;

