import { useComponentVisible } from '@hooks/index';
import { Button } from "@components/index";
import { useEffect, useState } from "react";
import styles from './Form.modal.module.scss';

const FormModal = ({ state, setState, children, style }) => {

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    setIsComponentVisible(state)
  }, [setIsComponentVisible, state])

  useEffect(() => {
    setState && setState(isComponentVisible);
  }, [setState, isComponentVisible])

    return (
    <>
        <div 
            className={`${styles.container} ${isComponentVisible ? styles.isVisible : styles.isHidden} ${styles[style]}`}
            ref={ref}
        >   
          <div className={styles.close}>
              <Button            
                  handler={() => setIsComponentVisible(false)}
                  icon="close"
                  style="none"
              >
              </Button>
          </div>
          
          <div className={styles.holder}>
            {children}
          </div>
            

        </div>
    </>
    )
  }

export default FormModal;