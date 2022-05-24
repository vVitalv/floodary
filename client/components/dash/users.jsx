import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'

const UserList = () => {
  const { usersOnline } = useSelector((store) => store.messages)
  function toggle() {
    const usersSidebar = document.querySelector('#users-sidebar')
    const roomsSidebar = document.querySelector('#rooms-sidebar')
    roomsSidebar.classList.toggle('z-10')
    usersSidebar.classList.toggle('translate-x-44')
  }
  return (
    <div
      id="users-sidebar"
      className="absolute flex h-full w-44 -ml-44 z-10 font-semibold text-gray-600 transition duration-150"
    >
      <div className="w-full h-full px-2 bg-gray-400 bg-opacity-90 overflow-y-auto">
        <h2>online</h2>
        {usersOnline.map((user) => {
          return (
            <div className="text-amber-300" key={uuidv4()}>
              {user}
            </div>
          )
        })}
      </div>
      <button
        className="w-fit h-fit py-1 -mr-6 mt-16 rounded-r-md bg-purple-300 opacity-70"
        type="button"
        onClick={toggle}
      >
        <p className="[writing-mode:vertical-lr]">users</p>
      </button>
    </div>
  )
}

UserList.propTypes = {}

export default React.memo(UserList)
