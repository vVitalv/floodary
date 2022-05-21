import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'

import InputRoomName from './inputroomname'

const Rooms = () => {
  const [isInputShow, showInput] = useState(false)
  const { currentRoom, rooms } = useSelector((store) => store.messages)

  return (
    <div className="relative h-8 bg-gray-500 text-gray-600">
      <div className="absolute w-full h-full flex pt-1 px-6 overflow-x-scroll scrollbar-thin">
        <button
          type="button"
          className="px-3 rounded-t-xl border border-gray-400 bg-gray-300"
          onClick={() => showInput(true)}
        >
          +
        </button>
        {isInputShow &&
          createPortal(
            <InputRoomName showInput={showInput} />,
            document.querySelector('#dialog-window')
          )}
        {rooms.map((room) => {
          const roomStyle =
            room === currentRoom
              ? 'bg-indigo-300 px-2 -mr-1 z-10 rounded-t-xl'
              : 'bg-gray-300 px-2 -mr-1 border border-gray-400 rounded-t-xl'
          return (
            <div className={roomStyle} key={uuidv4()}>
              {room}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Rooms.propTypes = {}

export default React.memo(Rooms)
