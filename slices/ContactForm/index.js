import { Form } from '@components/index'

const ContactForm = ({data}) => {
  
  return (

    <Form 
      formfields={data}
      type="contact"
    />

  )
}


export default ContactForm