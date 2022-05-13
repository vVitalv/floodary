import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addMessage } from '../../redux/reducers/messages'

const Dialog = () => {
  const dispatch = useDispatch()
  const { messages, currentRoom } = useSelector((store) => store.messages)
  return (
    <div className="relative basis-2/3 border-x-2 border-x-amber-200">
      <div className="absolute bg-slate-200 w-fit rounded-br-xl px-6">
        {currentRoom.split('').join(' ')}
      </div>
      <div className="text-gray-500 p-6">messages</div>
      <div className="absolute bottom-0 bg-slate-200 px-4">
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
            dispatch(addMessage(''))
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

Dialog.propTypes = {}

export default React.memo(Dialog)
