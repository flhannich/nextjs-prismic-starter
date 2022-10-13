
import { useState, useEffect } from 'react';

import { 
    FormProvider as ContextProvider,
    FormContext as Context
} 
from './Form.context.js'

import Checkbox from './Checkbox';
import Textarea from './Textarea';
import Range from './Range';
import Input from './Input';
import Select from './Select';
import Date from './Date';
import Time from './Time';
import Submit from './Form.submit';

import styles from "./Form.module.scss";
import SuccessMessage from './Form.success';
import ErrorMessage from './Form.error';
import { checkFormProps } from './Form.lib';


const Form = ({formfields, variant}) => {

    const [data, setData] = useState({});

    useEffect(() => {        
        setData(checkFormProps(formfields))
    }, [formfields])

    return (
        
        <section className={`${styles.container} ${styles[variant]}`}>

            <ContextProvider>
                
                {data.items && data.items.map((item, index) => {
                    switch(item.type) {
                        case 'form_input':
                            return (
                                <Input key={index} data={item.data} />
                            )
                        break;
                        case 'form_select':
                            return (
                                <Select key={index} data={item.data} items={item.items}/>
                            )
                        break;
                        case 'form_time':
                            return (
                                <Time key={index} data={item.data} />
                            )
                        case 'form_date':
                            return (
                                <Date key={index} data={item.data} />
                            )
                        case 'form_range':
                            return (
                                <Range key={index} data={item.data} />
                            )
                        break;
                        case 'form_message':
                            return (
                                <Textarea key={index} data={item.data} />
                            )
                        break;
                        case 'form_checkbox':
                            return (
                                <Checkbox key={index} data={item.data} />
                            )
                        break;
                        default:
                          return <p>Unkown Form</p>;
                      }
                })}
                

                <ErrorMessage 
                    data={data.error_message} 
                />

                <div className={styles.submit}>
                    <Submit 
                        variant={variant}
                        label={data.submit_label}
                    />
                </div>

                <SuccessMessage 
                    description={data.success_description} 
                    title={data.success_title}
                />
                   
            </ContextProvider>
            
        </section>
    )
}

export default Form;

