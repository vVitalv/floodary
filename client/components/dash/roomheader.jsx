import React from 'react'
import { useSelector } from 'react-redux'

const RoomHeader = () => {
  const { currentRoom } = useSelector((store) => store.messages)
  return (
    <div className="w-full h-fit flex justify-end px-6 bg-gray-500 text-amber-300">
      {currentRoom.split('').join(' ')}
    </div>
  )
}

RoomHeader.propTypes = {}

export default React.memo(RoomHeader)
