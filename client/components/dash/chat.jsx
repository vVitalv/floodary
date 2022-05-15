import React from 'react'

import Dialog from './dialog'
import UserList from './users'

const Chat = () => {
  return (
    <div className="flex basis-4/5 border-x-2 border-x-amber-200">
      <Dialog />
      <UserList />
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
