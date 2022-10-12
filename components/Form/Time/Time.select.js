import { useState, useEffect, useContext } from "react";
import { FormContext } from '../Form.context';
import { Icons } from '@components/index';
import styles from './Time.module.scss';

const TimeSelect = ({handler, setState}) => {

    const { updateFormData, registerFormData, formData } = useContext(FormContext);
    
    const [ times, setTimes ] = useState([]);
    const [ selectedTime, setSelectedTime] = useState(null)
    
    const startTime = 6;
    const workingHours = 16;
    const minuteSteps = 30;
    
    useEffect(() => {
        generateTimesArray();
    },[])


const generateTimesArray = () => {
    let res = []
    
    for (let i = 0; i < workingHours; i++) {
        for (let k = 0; k < 60 / minuteSteps; k++) {
            let step = k * minuteSteps;
            
            res.push({
                h: i + startTime,
                m: step === 0 ? '00' : step
            })       
        }
    }
    setTimes(res)
}


    const handleSelect = selectedTime => {
        handler(`${selectedTime.h}:${selectedTime.m}`);
        setState(false);
    }
    
    
    return (

        <div className={styles.timeSelect}>
            {times.map((item, index) => (
                <div 
                    key={index}
                    className={styles.holder}
                    onClick={() => handleSelect(item)}
                >
                    <span>{item.h}:{item.m}</span>
                </div>
            ))}
       
        

        </div>
    )
}

export default TimeSelect;

