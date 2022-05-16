import React from 'react'
import { useSelector } from 'react-redux'

const Rooms = () => {
  const { currentRoom } = useSelector((store) => store.messages)

  return (
    <div className="flex pt-1 px-2">
      <div className="px-3 rounded-t-xl bg-slate-300">+</div>
      <div className="bg-amber-200 px-2 rounded-t-xl">{currentRoom}</div>
    </div>
  )
}

Rooms.propTypes = {}

export default React.memo(Rooms)
