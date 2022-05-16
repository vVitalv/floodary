import React from 'react'
import { useSelector } from 'react-redux'

const Dialog = () => {
  const { receivedMess } = useSelector((store) => store.messages)
  const { user } = useSelector((store) => store.auth)
  return (
    <div className="flex flex-col gap-1 grow p-4 text-gray-600 bg-amber-200">
      {receivedMess.map((msg, ind) => {
        const msgEntries = Object.entries(msg)
        const userName = msgEntries[0][0]
        const message = msgEntries[0][1]
        const msgStyle =
          userName === user.login
            ? 'bg-amber-300 px-3 rounded-t-xl rounded-bl-xl w-fit self-end'
            : 'bg-amber-300 px-3 rounded-t-xl rounded-br-xl w-fit'
        return <p className={msgStyle} key={ind + 2}>{`${userName}: ${message}`}</p>
      })}
    </div>
  )
}

Dialog.propTypes = {}

export default React.memo(Dialog)
