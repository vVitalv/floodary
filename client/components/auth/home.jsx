import React from 'react'
import Div100vh from 'react-div-100vh'

import Head from '../head'
import LoginForm from './login'

const Home = () => {
  return (
    <Div100vh>
      <Head title="Wellcome" />
      <LoginForm />
    </Div100vh>
  )
}

Home.propTypes = {}

export default Home
