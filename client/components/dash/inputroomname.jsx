import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { inputRoomName, createRoom } from '../../redux/reducers/messages'

const InputRoomName = (props) => {
  const dispatch = useDispatch()
  const { rooms, newRoomName } = useSelector((store) => store.messages)
  return (
    <input
      className="fixed w-40 right-6 top-28 md:top-20 pl-2 opacity-70 bg-gray-200 text-gray-600 rounded-md outline-none"
      id="input-room-name"
      value={newRoomName}
      onChange={(e) => dispatch(inputRoomName(e.target.value))}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && newRoomName.length && !rooms.includes(newRoomName)) {
          dispatch(createRoom(newRoomName))
          props.showInput(false)
        }
      }}
      placeholder="Room name"
      autoComplete="off"
    />
  )
}

InputRoomName.propTypes = {}

export default React.memo(InputRoomName)
