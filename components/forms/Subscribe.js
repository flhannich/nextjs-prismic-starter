import { useState, useContext } from "react";
import styles from './Subscribe.module.scss';
import axios from "axios";
import { RichText } from "prismic-reactjs";
import { useRouter } from 'next/router'
import { AppContext } from "context/AppContext";
import { validateEmail, validateLegal } from '@utils/inputValidation';

import { 
    Modal,
    Input, 
    Checkbox,
    Submit } from '@components/index';


const Subscribe = ({slice}) => {

    const lang = useRouter().locale;
    const { uiContents } = useContext(AppContext);

    const [data, setData] = useState({
        email: '', 
        legal: false,
        sent: false, 
        sending: false, 
        sendingError: false,
        formValidationError: false,
        success: false,
        validation: {
            email: false,
            legal: false,
        }
    })


    const handleChange = (e, valid) => {
        const {name, value, checked} = e.target;
        let isCheckBox = e.target.hasOwnProperty('checked');

        setData({
            ...data,
            [name]: isCheckBox ? checked : value,
            validation: {
                ...data.validation,
                [name]: valid
            }
        })
    }
    

    const validateBeforeSend = () => {
        let values = Object.values(data.validation);
        let res = values.includes(false);

        setData({
            ...data,
            formValidationError: res,
        })
        return !res;
    }


    const formSubmit = (e) => {
        e.preventDefault();

        if(!validateBeforeSend()) { return }

        setData({
            ...data,
            sending: true,
            error: []
        })
        

        axios.post('/api/functions/newsletter', data)
        .then(res => {
            if(!res.data.emailAdded) {
                setData({
                    ...data,
                    sent: false,
                    sending: false,
                    sendingError: true,
                })
            } else {
                console.error(res);
                setData({
                    ...data,
                    sent: true,
                    sending: false,
                    success: true,
                    sendingError: false,
                })
            }
        }).catch((err) => {
            console.error(err);
            setData({
                ...data,
                sending: false,
                sendingError: true,
            })
        })
    }


    return (

        <section className={styles.container}>
            
            { slice && slice.primary.title &&
                <div className={styles.title}>
                    <h3>{RichText.asText(slice.primary.title)}</h3>
                </div>
            }
            
            <form>   

                <Input 
                    handler={handleChange}
                    value={data.email}
                    label={uiContents.inputEmail.label[lang]}
                    name={`email`}
                    type={`email`}
                    validation={validateEmail}
                    placeholder={uiContents.inputEmail.placeholder[lang]}
                    hasFormValidationError={data.formValidationError && !data.validation.email}
                    errorMessage={
                        data.email === '' 
                        ?   uiContents.inputEmail.error[lang].missing
                        :   uiContents.inputEmail.error[lang].failed
                    }
                />

                <Checkbox
                    handler={handleChange}
                    checked={data.legal}
                    type={`switch`}
                    name={`legal`}
                    value={`accepted`}
                    validation={validateLegal}
                    label={uiContents.inputLegal.label[lang]}
                    hasFormValidationError={data.formValidationError && !data.validation.legal}
                    errorMessage={uiContents.inputLegal.error[lang].failed}
                />


                <Submit 
                    handler={formSubmit}
                    sending={data.sending}
                    text={uiContents.formSubmit.subscribe[lang]}
                />

            </form>

            {data.success &&
                <Modal>
                    Thank you
                </Modal>
            }

        </section>
    )
}

export default Subscribe;