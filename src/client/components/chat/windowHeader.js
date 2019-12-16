import React from 'react'

export default ({ chat, closeChat }) => {
  return (
    <div className="header">
      <span>{chat.users[1].username}</span>
      <button className="close" onClick={() => closeChat(chat.id)}>X</button>
    </div>
  )
}
