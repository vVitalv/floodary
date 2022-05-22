import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'

import { inputRoomName, createRoom, updateCurrentRoom } from '../../redux/reducers/messages'

const Rooms = () => {
  const dispatch = useDispatch()
  const { currentRoom, rooms, newRoomName } = useSelector((store) => store.messages)
  function toggle() {
    const roomsSidebar = document.querySelector('#rooms-sidebar')
    const usersSidebar = document.querySelector('#users-sidebar')
    setTimeout(() => {
      usersSidebar.classList.toggle('z-10')
    }, 150)
    roomsSidebar.classList.toggle('translate-x-44')
  }
  function testAndCreateRoom() {
    if (newRoomName.length && !rooms.includes(newRoomName)) {
      dispatch(createRoom(newRoomName))
    }
  }
  return (
    <div
      id="rooms-sidebar"
      className="absolute flex h-full w-44 -ml-44 z-10 font-semibold text-gray-600 transition delay-150"
    >
      <div className="flex flex-col w-full h-full px-2 bg-gray-400 bg-opacity-90">
        <h2>rooms</h2>
        <div className="flex h-10 py-2">
          <input
            className="bg-gray-200 pl-1 w-28 rounded-md outline-none"
            id="input-room-name"
            value={newRoomName}
            onChange={(e) => dispatch(inputRoomName(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') testAndCreateRoom()
            }}
            placeholder="New room"
            autoComplete="off"
          />
          <button
            type="button"
            className="bg-amber-400 font-semibold text-gray-600 text-xs rounded-md ml-2 px-1 transition-colors duration-200 hover:text-gray-800 hover:bg-amber-300"
            onClick={testAndCreateRoom}
          >
            Add
          </button>
        </div>
        {rooms.map((room) => {
          if (room === currentRoom) {
            return (
              <p className="text-amber-300" key={uuidv4()}>
                {room}
              </p>
            )
          }
          return (
            <button
              type="button"
              className="text-gray-200 w-fit"
              key={uuidv4()}
              onClick={() => dispatch(updateCurrentRoom(room))}
            >
              {room}
            </button>
          )
        })}
      </div>
      <button
        className="w-fit h-fit py-1 -mr-4 mt-2 text-xs rounded-r-md bg-pink-300 opacity-70"
        type="button"
        onClick={toggle}
      >
        <p className="[writing-mode:vertical-rl]">rooms</p>
      </button>
    </div>
  )
}

Rooms.propTypes = {}

export default React.memo(Rooms)
