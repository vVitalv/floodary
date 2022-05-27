import React from 'react'
import Div100vh from 'react-div-100vh'
import { useSelector } from 'react-redux'

import Head from '../head'
import Header from './header'
import RoomHeader from './roomheader'
import Chat from './chat'
import TypeMessage from './typemessage'
import Footer from './footer'

const Dashboard = () => {
  const { currentRoom } = useSelector((store) => store.messages)
  return (
    <Div100vh>
      <Head title={currentRoom} />
      <div className="flex flex-col h-full w-screen font-mono overflow-hidden">
        <Header />
        <main className="flex flex-col grow">
          <RoomHeader />
          <Chat />
          <TypeMessage />
        </main>
        <Footer />
      </div>
    </Div100vh>
  )
}

export default Dashboard
