import styles from "./Button.module.scss"
import { Icons } from "@components/index"

const Button = ({ handler, state, icon, label, variant }) => {

  return (
    <>
      { handler 

      ?   <button
              type="button" 
              className={`${styles.container} ${styles[variant]} ${icon && styles.hasIcon} ${label && styles.hasLabel} ${state && styles.isActive}`}
              onClick={handler}
            >
            {icon && <Icons name={icon} />}
            {label}
          </button>

      :   <span 
            className={`${styles.container} ${styles[variant]} ${icon && styles.hasIcon} ${label && styles.hasLabel} ${state && styles.isActive}`}
          >
            {icon && <Icons name={icon} />}
            {label}
          </span>

      }
    </>
  )
}

export default Button