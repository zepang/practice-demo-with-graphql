import React from 'react'

export default (props) => {
  const { addMessage, textInputs, chat, onChangeChatInput, handleKeyPress } = props
  return (
    <div className="input">
      <input type="text"
        value={textInputs[chat.id]}
        onChange={e => onChangeChatInput(e, chat.id)}
        onKeyPress={e => handleKeyPress(e, chat.id, addMessage)}/>
    </div>
  )
}
