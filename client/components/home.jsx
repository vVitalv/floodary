import React from 'react'

import Head from './head'
import LoginForm from './auth/login'

const Home = () => {
  return (
    <div>
      <Head title="Wellcome" />
      <LoginForm />
    </div>
  )
}

Home.propTypes = {}

export default Home
