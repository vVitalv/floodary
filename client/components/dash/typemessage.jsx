import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addMessage } from '../../redux/reducers/messages'
import { sendMessage } from '../../redux/sockets/socketReceivers'

const TypeMessage = () => {
  const dispatch = useDispatch()
  const { messages, currentRoom } = useSelector((store) => store.messages)
  const flood = () => {
    sendMessage(messages, currentRoom)
    dispatch(addMessage(''))
  }

  return (
    <div className="flex h-10 p-2 gap-2 px-4 bg-gray-500">
      <input
        className="bg-gray-200 text-gray-600 grow px-2 rounded-md outline-none"
        id="message"
        value={messages}
        onChange={(e) => {
          dispatch(addMessage(e.target.value))
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && messages.length) flood()
        }}
        placeholder="Flood here"
        autoComplete="off"
      />
      <button
        className="bg-slate-400 text-gray-800 font-semibold text-xs rounded-md px-2 transition-colors duration-200 hover:text-amber-300 hover:bg-slate-600"
        type="button"
        onClick={flood}
      >
        Send
      </button>
    </div>
  )
}

TypeMessage.propTypes = {}

export default React.memo(TypeMessage)
