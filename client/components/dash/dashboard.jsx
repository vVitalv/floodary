import React from 'react'

import Head from '../head'
import Header from './header'
import Rooms from './rooms'
import Chat from './chat'
import TypeMessage from './typemessage'
import Footer from './footer'

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen w-screen font-mono font-semibold text-amber-500">
      <Head title="RoomName" />
      <Header />
      <main className="flex flex-col">
        <Rooms />
        <Chat />
        <TypeMessage />
      </main>
      <Footer />
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard
