import React from 'react'

import Head from './head'
import Chat from './dash/chat'

const Dashboard = () => {
  return (
    <div>
      <Head title="Flood!" />
      <Chat />
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard
