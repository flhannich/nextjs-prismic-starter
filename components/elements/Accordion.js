import { useState, useEffect, useRef } from "react";
import styles from "./Accordion.module.scss"

const Accordion = ({title, state, children}) => {

    const [dropdownState, setDropdownState] = useState(state)
    const childContainerRef = useRef(null)
    const heightRef = useRef(0)

    useEffect(() => {          
        calcHolderHeight();
        
        window.addEventListener('resize', calcHolderHeight, {passive: true});
        return () => {
            window.removeEventListener('resize', calcHolderHeight, {passive: true});
        }
    }, []);


    useEffect(() => {
        
        if(childContainerRef) {
            const childContainer = childContainerRef.current
            if(dropdownState) {
                childContainer.style.height = heightRef.current + 'px';
            } else {
                childContainer.style.height = 0 + 'px';
            }
        }
    },[dropdownState]);



    const calcHolderHeight = () => {
        const childContainer = childContainerRef.current
        heightRef.current = childContainer.scrollHeight;
    }


    return (
        <div className={styles.container}>

            <div 
                className={styles.title}
                onClick={() => setDropdownState(!dropdownState)}
            >
                <span>{title}</span>
            </div>

            <div 
                className={`${styles.holder} ${dropdownState ? styles.isVisible : ''}`}
                ref={childContainerRef}
                style={{height: 0}}
            >
                {children}
            </div>

        </div>

    )
}

export default Accordion;