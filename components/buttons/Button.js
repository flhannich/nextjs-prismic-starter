import styles from "./Button.module.scss"
import { Icons } from "@components/index"

const Button = ({ children, handler, state, style, type }) => {

  return (

      <button
            type={type || 'button'} 
            className={`${styles.container} ${styles[style]} ${state ? styles.isActive : ''}`}
            onClick={handler}
          >
          {children}
      </button>

  )
}

export default Button