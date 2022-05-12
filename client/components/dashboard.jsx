import React from 'react'

import Head from './head'
import Header from './header'
import Chat from './dash/chat'
import Footer from './footer'

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Head title="Flood!" />
      <Header />
      <Chat />
      <Footer />
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard
