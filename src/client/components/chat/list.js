import React, { Component } from 'react'
import Chat from './index'

export default class ChatList extends Component {
  render () {
    const { chats, openChat } = this.props
    return (
      <div className="chats">
        {
          chats.map(chat => (
            <Chat key={chat.id} chat={chat} openChat={openChat}></Chat>
          ))
        }
      </div>
    )
  }
}
