import { useState, useEffect, useContext } from "react";
import { FormContext } from '../Form.context';
import { validate, getInputType } from './Date.lib';
import { checkProps } from './../Form.lib';
import { Icons } from '@components/index';
import styles from './Date.module.scss';
import sharedStyles from './../Form.module.scss';

const DateTime = () => {

    const { updateFormData, registerFormData, formData } = useContext(FormContext);

    const [ days, setDays ] = useState([]);
    const [ month, setMonth ] = useState(null);
    const [ year, setYear ] = useState(null);
    const [ selectedDate, setSelectedDate] = useState(null)
    const [ currentDate, setCurrentDate] = useState(null)


    useEffect(() => {
        setCurrentDay();
    },[])


    useEffect(() => {
        createDaysArray();
    },[month])


    const setCurrentDay = () => {
        const d = new Date();
        const currentDay = d.getDate();
        const currentMonth = d.getMonth() + 1;
        const currentYear = d.getFullYear();
        const dayInWeek = d.getDay();

        setMonth(currentMonth);
        setYear(currentYear);
        
        setCurrentDate([dayInWeek, currentDay, currentMonth, currentYear])
    }


    const createDaysArray = () => {
        let daysInCurrentMonth = new Date(year, month, 0).getDate(),
            arr = [];

        Array.from(Array(daysInCurrentMonth)).map((_, index) => {
            let dayInWeek = new Date(year, month, index + 1).getDay();
            arr.push([dayInWeek, index + 1, month, year])
        })

        setDays(arr);
    }   


    const getMonthName = month => {
        const en = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const de = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

        return de[month];
    }

    const getDayName = dayInWeek => {
        const en = ["Monday","Tuesday","Wednessday","Thursday","Friday","Saturday","Sunday"];
        const de = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];

        return de[dayInWeek];
    }


    const handleSelect = selectedDate => {
        setSelectedDate(selectedDate)
    }


    const handleNavigate = val => {
        let newMonth = month + val;

        if(val < 0 && month === 1) {
            newMonth = 12
            setYear(year => year - 1)
        }
        else if(val > 0 && month === 12) {
            newMonth = 1
            setYear(year => year + 1)
        }

        setMonth(newMonth);
    }


    return (

        <div className={styles.container}>
            <div onClick={() => handleNavigate(-1)}>Prev</div>
            <div className={styles.year}>{year}</div>
            <div className={styles.month}>{getMonthName(month - 1)}</div>
            <div onClick={() => handleNavigate(1)}>Next</div>

            <div className={styles.days}>
                {days.map((item, index) => (
                    <span 
                        key={index}
                        onClick={() => handleSelect(item)}
                        className={`
                            ${item.toString() === currentDate.toString() ? styles.isToday : ''}
                            ${item.toString() === selectedDate?.toString() ? styles.isSelected : ''}
                        `}
                    >
                        {item[0]}
                    </span>  
                ))}
            </div>
        

        </div>
    )
}

export default DateTime;

