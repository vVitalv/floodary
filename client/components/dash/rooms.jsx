import React from 'react'
import { useSelector } from 'react-redux'

const Rooms = () => {
  const { currentRoom } = useSelector((store) => store.messages)

  return (
    <div className="flex justify-end pt-1 px-6 bg-gray-500 text-gray-600">
      <div className="px-3 rounded-t-xl bg-gray-300">+</div>
      <div className="bg-indigo-300 px-2 rounded-t-xl">{currentRoom}</div>
    </div>
  )
}

Rooms.propTypes = {}

export default React.memo(Rooms)
