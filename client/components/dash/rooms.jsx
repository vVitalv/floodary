import React from 'react'
import { useSelector } from 'react-redux'

const Rooms = () => {
  const { currentRoom } = useSelector((store) => store.messages)

  return (
    <div className="flex h-10 bg-slate-200 p-4 text-gray-500">
      <div className="bg-slate-200 p-4 text-gray-500 rounded-t-md">{currentRoom}</div>
    </div>
  )
}

Rooms.propTypes = {}

export default React.memo(Rooms)
