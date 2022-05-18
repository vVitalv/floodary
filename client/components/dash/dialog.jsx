import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Dialog = () => {
  const { receivedMess } = useSelector((store) => store.messages)
  const { user } = useSelector((store) => store.auth)

  useEffect(() => {
    const chatWindow = document.querySelector('#dialog-window')
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' })
    return () => {}
  }, [receivedMess])
  return (
    <div className="relative grow text-gray-600 bg-neutral-200 break-all ">
      <div
        id="dialog-window"
        className="absolute flex flex-col w-full h-full py-2 gap-2 overflow-auto overscroll-auto"
      >
        {receivedMess.map((msg, ind, msgs) => {
          //  const msgEntries = Object.entries(msg)
          //  const userName = msgEntries[0][0]
          //  const message = msgEntries[0][1]
          const { userName, message, date } = msg
          const currDate = new Date(date).toDateString()
          const prevDate = ind === 0 ? currDate : new Date(msgs[ind - 1].date).toDateString()
          const time = new Date(date).toLocaleTimeString()
          const msgMStyle =
            userName === user.login
              ? 'flex flex-col items-end px-2'
              : 'flex flex-col items-start px-2'
          const msgStyle =
            userName === user.login
              ? 'bg-amber-300 mx-2 rounded-t-xl rounded-bl-xl w-fit self-end px-2'
              : 'bg-amber-300 mx-2 rounded-t-xl rounded-br-xl w-fit px-2'
          return (
            <div className="flex flex-col" key={date}>
              {currDate !== prevDate && (
                <div className="sticky w-full bg-gray-300 rounded-full text-center mb-2 backdrop-blur-md">
                  {currDate}
                </div>
              )}
              <div className={msgMStyle}>
                <p className={msgStyle}>{message}</p>
                <p className="text-gray-400 text-xs px-4">
                  {`${userName} - `}
                  <span className="font-thin">{time}</span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Dialog.propTypes = {}

export default React.memo(Dialog)
