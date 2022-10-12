import { useState, useEffect, useContext } from "react";
import { FormContext } from '../Form.context';
import { Icons } from '@components/index';
import styles from './Date.module.scss';

const DateSelect = ({handler, setState}) => {

    const { updateFormData, registerFormData, formData } = useContext(FormContext);
    
    const [ days, setDays ] = useState([]);
    const [ month, setMonth ] = useState(null);
    const [ year, setYear ] = useState(null);
    const [ selectedDate, setSelectedDate] = useState(null)
    const [ currentDate, setCurrentDate] = useState(null)

    const monthNames_en = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthNames_de = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    const dayNames_en = ["Mo","Tu","We","Th","Fr","Sa","Su"];
    const dayNames_de = ["Mo","Di","Mi","Do","Fr","Sa","So"];

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
            arr = [],
            daysToWeekStart = 0;
            
              
        Array.from(Array(daysInCurrentMonth)).map((_, index) => {
            // let dayInWeek = new Date(`${year}-${month}-${index + 1}`).getDay();
            let d = new Date(`${year}-${month}-${index + 1}`);
            // let dayInWeek = d.getDate() - ((d.getDay() + 6) % 7); 
            
            let dayInWeek = [6,0,1,2,3,4,5][d.getDay()]
            
            if(index === 0) 
                daysToWeekStart = dayInWeek;
                
            arr.push([dayInWeek, index, month, year])
        })
        

        let daysToWeekStartArray = Array.from(Array(daysToWeekStart));
        
        daysToWeekStartArray.map((_, index) => {
            arr.unshift([0,0,0,0])
        })
        
        arr.shift() // remove first 
                        
        
        setDays(arr);
    }   


    const getMonthName = month => {
        return monthNames_de[month];
    }


    const handleSelect = selectedDate => {
        setSelectedDate(selectedDate)
        let date = formatDate(selectedDate);
        handler(date);
        setState(false);
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
    
    
    const formatDate = date => {
        return `${date[1]}.${date[2]}.${date[3]}`
    }
    
    return (

        <div className={styles.dateSelect}>
            
            <div className={styles.header}>
                
                <div 
                    className={`${styles.prev} ${currentDate && currentDate[2] === month ? styles.isDisabled : ''}`}
                    onClick={() => handleNavigate(-1)}
                >
                    <Icons name="arrow" />
                </div>
                
                <span className={styles.title}>
                    {getMonthName(month - 1)} {year}
                </span>
                
                <div 
                    className={styles.next} 
                    onClick={() => handleNavigate(1)}
                >
                    <Icons name="arrow" />
                </div>
            </div>
            
                
            <div className={styles.days}>
                
                <div className={styles.names}>
                    {dayNames_de.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}

                </div>
                
                <div className={styles.calendar}>
                    {days.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => handleSelect(item)}
                            className={`
                                ${styles.holder}
                                ${item.toString() === currentDate.toString() ? styles.isToday : ''}
                                ${item.toString() === selectedDate?.toString() ? styles.isSelected : ''}
                                ${currentDate[2] === month && item[1] < currentDate[1] ? styles.isDisabled : ''}
                                ${item[0] === 0 ? styles.isWeekend : ''}
                                ${item[1] === 0 ? styles.placeholder : ''}
                            `}
                        >
                            <span> {item[1]} </span>  
                        </div>
                    ))}
                </div>
                
            </div>
        

        </div>
    )
}

export default DateSelect;

