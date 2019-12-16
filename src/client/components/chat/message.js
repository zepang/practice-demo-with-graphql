import React from 'react'

export default ({ message }) => {
  return (
    <div
      className={'message ' + (message.user.id > 11 ? 'left' : 'right')}>
      {message.text}
    </div>
  )
}
