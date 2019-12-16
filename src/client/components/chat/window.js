import React, { Component } from 'react'
import Message from './message'
import WindowHeader from './windowHeader'

export default class ChatWindow extends Component {
  render () {
    const { chat, children, closeChat } = this.props
    return (
      <div className="chatWindow">
        <WindowHeader chat={chat} closeChat={closeChat}></WindowHeader>
        <div className="messages">
          {chat.messages.map((message, i) =>
            <Message key={'message' + message.id} message={message}></Message>
          )}
        </div>
        {
          React.Children.map(children, child => {
            return React.cloneElement(child, { chat })
          })
        }
      </div>
    )
  }
}
