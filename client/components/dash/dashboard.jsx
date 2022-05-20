import React from 'react'

import Head from '../head'
import Header from './header'
import Rooms from './rooms'
import Chat from './chat'
import TypeMessage from './typemessage'
import Footer from './footer'

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full w-full font-mono font-semibold text-amber-500 overflow-hidden">
      <Head title="RoomName" />
      <Header />
      <main className="flex flex-col grow bg-gray-500 text-gray-600">
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
