import React from 'react'

import Head from '../head'
import Header from './header'
import Chat from './chat'
import Footer from './footer'

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen w-screen font-mono font-semibold text-amber-500">
      <Head title="RoomName" />
      <Header />
      <Chat />
      <Footer />
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard
