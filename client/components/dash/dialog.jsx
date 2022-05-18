import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Dialog = () => {
  const { receivedMess } = useSelector((store) => store.messages)
  const { login } = useSelector((store) => store.auth.user)
  useEffect(() => {
    const chatWindow = document.querySelector('#dialog-window')
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' })
    return () => {}
  }, [receivedMess])
  return (
    <div className="relative grow text-gray-600 bg-purple-400 break-all ">
      <div
        id="dialog-window"
        className="absolute flex flex-col w-full h-full p-2 gap-2 overflow-auto overscroll-auto"
      >
        {receivedMess.map((msg, ind, msgs) => {
          const userName = msg[0]
          const message = msg[1]
          const date = msg[2]
          const currDate = new Date(date).toDateString()
          const prevDate =
            ind === 0
              ? new Date(date - 24 * 60 * 60 * 1000).toDateString()
              : new Date(msgs[ind - 1][2]).toDateString()
          const time = new Date(date).toLocaleTimeString()
          const msgMStyle =
            userName === login
              ? 'flex flex-col bg-lime-300 w-fit items-end px-2 rounded-t-xl rounded-bl-xl self-end'
              : 'flex flex-col bg-amber-300 w-fit items-start px-2 rounded-t-xl rounded-br-xl'

          return (
            <div className="flex flex-col" key={date}>
              {currDate !== prevDate && (
                <div className="w-fit self-center bg-gray-300 rounded-full text-center px-4 mb-2 backdrop-blur-md">
                  {currDate}
                </div>
              )}
              <div className={msgMStyle}>
                <p className="text-purple-400 text-xs px-2">
                  {`${userName} - `}
                  <span className="font-thin">{time}</span>
                </p>
                <p>{message}</p>
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
