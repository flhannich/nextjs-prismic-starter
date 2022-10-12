import styles from "./Button.module.scss"
import { Icons } from "@components/index"

const Button = ({ children, handler, state, style, type, icon }) => {

  return (

      <button
            type={type || 'button'} 
            className={`${styles.container} ${styles[style]} ${state ? styles.isActive : ''}`}
            onClick={handler}
          >
          {children}
          
          {icon &&
            <Icons name={icon} />
          }
          
      </button>

  )
}

export default Button