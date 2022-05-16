import React from 'react'

import Dialog from './dialog'
import UserList from './users'

const Chat = () => {
  return (
    <div className="flex grow basis-4/5">
      <Dialog />
      <UserList />
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
