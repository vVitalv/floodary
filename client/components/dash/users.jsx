import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const { usersOnline } = useSelector((store) => store.messages)
  return (
    <div className="flex flex-col basis-1/5 px-4 gap-2">
      <h2>online</h2>
      {usersOnline.map((user, ind) => {
        return (
          <div className="text-green-500" key={ind}>
            {user}
          </div>
        )
      })}
    </div>
  )
}

UserList.propTypes = {}

export default React.memo(UserList)
