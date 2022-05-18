import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addMessage } from '../../redux/reducers/messages'
import { sendMessage } from '../../redux/sockets/socketReceivers'

const TypeMessage = () => {
  const dispatch = useDispatch()
  const { messages, currentRoom } = useSelector((store) => store.messages)
  return (
    <div className="flex h-10 p-2 gap-2 px-4">
      <textarea
        className="bg-amber-100 text-gray-600 grow px-2 rounded-md outline-none resize-none"
        id="message"
        value={messages}
        onChange={(e) => dispatch(addMessage(e.target.value))}
        placeholder="Flood here"
        autoComplete="off"
      />
      <button
        className="bg-slate-300 font-semibold text-xs rounded-md px-2 transition-colors duration-200 hover:text-amber-300 hover:bg-slate-500"
        type="button"
        onClick={() => {
          sendMessage(messages, currentRoom)
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
