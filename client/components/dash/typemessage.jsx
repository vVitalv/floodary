import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { inputMessage } from '../../redux/reducers/messages'
import { sendMessage } from '../../redux/sockets/socketReceivers'

const TypeMessage = () => {
  const dispatch = useDispatch()
  const { messages, currentRoom } = useSelector((store) => store.messages)

  function flood() {
    sendMessage(messages, currentRoom)
    dispatch(inputMessage(''))
  }

  return (
    <div className="flex h-10 p-2 gap-2 px-4 bg-gray-500">
      <input
        className="bg-gray-200 text-gray-600 grow px-2 rounded-md outline-none"
        id="message"
        value={messages}
        onChange={(e) => dispatch(inputMessage(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && messages.length) flood()
        }}
        placeholder="Flood here"
        autoComplete="off"
      />
      <button
        className="bg-amber-400 text-gray-600 font-semibold text-xs rounded-md px-2 transition-colors duration-200 hover:text-gray-800 hover:bg-amber-300"
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
