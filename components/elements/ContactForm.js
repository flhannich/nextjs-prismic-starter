import { Form } from '@components/index';
import styles from './ContactForm.module.scss';

const ContactForm = ({formfields}) => {

  return (
    <div className={styles.container}>

      <Form 
        formfields={formfields}
        variant="contact"
      />
    </div>

  )
}


export default ContactForm