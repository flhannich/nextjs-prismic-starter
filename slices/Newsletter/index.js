import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Subscribe } from '@components/index'

const Newsletter = ({ slice }) => (
  <section>

      <RichText render={slice.primary.title}/>
      <RichText render={slice.primary.description}/>

      <Subscribe />

  </section>
)

export default Newsletter