
import { Button } from '@components/index';
import { useContext } from 'react';
import { FormContext } from './Form.context';
import { send } from './Form.lib';

const Submit = props => {

    const { formData, setFormData } = useContext(FormContext);

    const handler = e => {
        e.preventDefault();

        if(props.type === 'contact') 
            send('api/functions/sendmail', formData, setFormData);

        else if(props.type === 'subscribe') 
            send('api/functions/subscribe', formData, setFormData);

        else 
            return false;

    }

    return (

        <Button 
            type="submit"
            style="cta"
            handler={(e) => handler(e)}
        >
            {props.sending 
                ?  <>Sending....</>
                :  <>{props.label}</>
            }
        </Button>

    )
}

export default Submit;

