import styles from './Dropdown.module.scss'
import { useComponentVisible } from '@hooks/index';
import { Icons } from "@components/index";
import { useEffect, useState } from "react";

const Modal = ({ state, setState, children, variant }) => {

  //
  // @variant: top-left, top-right, bottom-left, bottom-right
  //

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
            className={`${styles.container} ${styles[variant]} ${isComponentVisible ? styles.isVisible : styles.isHidden}`}
            ref={ref}
        >   

            {children}

        </div>
    </>
    )
  }

export default Modal;