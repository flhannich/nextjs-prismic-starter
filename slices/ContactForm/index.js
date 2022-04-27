import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Contact} from '@components/index'

const ContactForm = ({ slice }) => {

  return (
    
    <section>

    { slice.primary.title &&
      <RichText render={slice.primary.title}/>
    }

    { slice.primary.description &&
      <RichText render={slice.primary.description}/>
    }

    <Contact />

  </section>
  )
}


export default ContactForm