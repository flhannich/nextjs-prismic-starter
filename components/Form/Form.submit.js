
import { Button } from '@components/index';
import { useContext } from 'react';
import { FormContext } from './Form.context';
import { sendMail } from './Form.lib';

const Submit = props => {

    const { formData, setFormData } = useContext(FormContext);

    const handler = e => {
        e.preventDefault();
        sendMail(formData, setFormData);
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

