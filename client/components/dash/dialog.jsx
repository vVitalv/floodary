import React from 'react'
import { useSelector } from 'react-redux'

const Dialog = () => {
  const { receivedMess } = useSelector((store) => store.messages)
  return (
    <div className="flex flex-col grow border-x-2 border-x-amber-200">
      {receivedMess.map((msg, ind) => {
        const msgEntries = Object.entries(msg)
        return <p key={ind + 2}>{`${msgEntries[0][0]}: ${msgEntries[0][1]}`}</p>
      })}
    </div>
  )
}

Dialog.propTypes = {}

export default React.memo(Dialog)
