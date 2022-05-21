import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'

const UserList = () => {
  const { usersOnline } = useSelector((store) => store.messages)
  function toggle() {
    const sidebar = document.querySelector('#users-online')
    sidebar.classList.toggle('translate-x-44')
  }
  return (
    <div
      id="users-online"
      className="absolute flex h-full -ml-44 z-20 font-semibold text-gray-600 transition delay-150"
    >
      <div className="p-4 w-44 h-full bg-gray-400 bg-opacity-80">
        <h2>online</h2>
        {usersOnline.map((user) => {
          return (
            <div className="text-amber-400 mt-2" key={uuidv4()}>
              {user}
            </div>
          )
        })}
      </div>
      <div className="bg-gray-400 w-1 bg-opacity-80" />
      <button
        className="self-center w-3 h-12 rounded-r-md bg-pink-300 opacity-70"
        type="button"
        onClick={toggle}
      >
        |
      </button>
    </div>
  )
}

UserList.propTypes = {}

export default React.memo(UserList)
