import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'

const Dialog = () => {
  const { messageHistory } = useSelector((store) => store.messages)
  const { login } = useSelector((store) => store.auth.user)
  const dates = Array.from(new Set(messageHistory.map((m) => new Date(m[2]).toDateString())))

  useEffect(() => {
    const chatWindow = document.querySelector('#dialog-window')
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' })
    return () => {}
  }, [messageHistory])

  return (
    <div className="relative grow text-gray-600 bg-indigo-300 break-all">
      <div
        id="dialog-window"
        className="absolute flex flex-col gap-2 w-full h-full p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-slate-700 scrollbar-track-gray-500"
      >
        {dates.map((msgsDate) => {
          return (
            <div className="flex flex-col gap-2" key={uuidv4()}>
              <div className="sticky top-0 w-fit self-center bg-gray-300 rounded-full text-center px-4">
                {msgsDate}
              </div>
              {messageHistory.map((msg) => {
                const userName = msg[0]
                const message = msg[1]
                const msDate = msg[2]
                const date = new Date(msDate).toDateString()
                const time = new Date(msDate).toLocaleTimeString()
                const msgMStyle =
                  userName === login
                    ? 'flex flex-col bg-lime-300 w-fit items-end ml-4 px-2 rounded-t-xl rounded-bl-xl self-end'
                    : 'flex flex-col bg-amber-200 w-fit items-start mr-4 px-2 rounded-t-xl rounded-br-xl'
                if (date === msgsDate) {
                  return (
                    <div className={msgMStyle} key={msDate}>
                      <p className="text-indigo-400 text-xs px-2">
                        {`${userName} - `}
                        <span className="font-thin">{time}</span>
                      </p>
                      <p>{message}</p>
                    </div>
                  )
                }
                return null
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Dialog.propTypes = {}

export default React.memo(Dialog)
