import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'

const UserList = () => {
  const { usersOnline } = useSelector((store) => store.messages)
  return (
    <div className="flex flex-col basis-1/5 px-4 gap-2 bg-gray-400 text-gray-600">
      <h2>online</h2>
      {usersOnline.map((user) => {
        return (
          <div className="text-green-500" key={uuidv4()}>
            {user}
          </div>
        )
      })}
    </div>
  )
}

UserList.propTypes = {}

export default React.memo(UserList)
