import styles from "./Button.module.scss"
import { Icons } from "@components/index"

const Button = ({ children, handler, state, classname, type, icon, ariaLabel }) => {

  const options = {
    classname: classname || "default"
  }

  return (

        <button
            aria-label={ariaLabel}
            type={type || 'button'} 
            className={`${styles.container} ${styles[options.classname]} ${state ? styles.isActive : ''}`}
            onClick={handler}
        >
          {children}
          
          {icon && <Icons name={icon} /> }
          
        </button>

  )
}

export default Button