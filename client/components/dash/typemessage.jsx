import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addMessage } from '../../redux/reducers/messages'
import { socket } from '../../redux/sockets/socketReceivers'

const TypeMessage = () => {
  const dispatch = useDispatch()
  const { messages, currentRoom } = useSelector((store) => store.messages)
  return (
    <div className="bg-slate-200 px-4">
      <input
        className="bg-amber-100 text-gray-600 font-semibold px-2 rounded-sm outline-none"
        id="message"
        value={messages}
        onChange={(e) => dispatch(addMessage(e.target.value))}
        type="text"
        placeholder="Flood here"
        autoComplete="off"
      />
      <button
        className="bg-slate-400 font-semibold text-xs rounded-md px-4 py-1 transition-colors duration-200 hover:text-amber-300 hover:bg-slate-600"
        type="button"
        onClick={() => {
          socket.emit('send mess', { messages, currentRoom })
          dispatch(addMessage(''))
        }}
      >
        Send
      </button>
    </div>
  )
}

TypeMessage.propTypes = {}

export default React.memo(TypeMessage)
