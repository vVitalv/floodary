import React from 'react'

import Dialog from './dialog'
import UserList from './users'

const Chat = () => {
  return (
    <div className="relative flex grow">
      <UserList />
      <Dialog />
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
