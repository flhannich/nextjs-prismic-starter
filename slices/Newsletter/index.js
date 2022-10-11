import { Form } from '@components/index'

const Newsletter = ({slice, data}) => {
  
  return (

    <Form 
      slice={slice} 
      formfields={data}
    />

  )
}


export default Newsletter