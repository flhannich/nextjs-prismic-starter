import styles from './Modal.module.scss'
import { useComponentVisible } from '@hooks/index';
import { Button } from "@components/index";
import { useEffect, useState } from "react";

const Modal = ({ state, setState, children }) => {

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    setIsComponentVisible(state)
  }, [state])

  useEffect(() => {
    setState && setState(isComponentVisible);
  }, [isComponentVisible])

    return (
    <>
        <div 
            className={`${styles.container} ${isComponentVisible ? styles.isVisible : styles.isHidden}`}
            ref={ref}
        >   
          <div className={styles.close}>
              <Button            
                  className={styles.close}
                  handler={() => setIsComponentVisible(false)}
                  icon="close"
                  variant="none"
              >
              </Button>
          </div>

           {children}

        </div>
    </>
    )
  }

export default Modal;