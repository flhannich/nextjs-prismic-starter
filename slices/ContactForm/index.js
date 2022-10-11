import { Form } from '@components/index'

const ContactForm = ({slice, data}) => {
  
  return (

    <Form 
      slice={slice} 
      formfields={data}
    />

  )
}


export default ContactForm