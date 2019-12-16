import React, { Component } from 'react'

export default class Chat extends Component {
  usernamesToString (users) {
    const userList = users.slice(1)
    let usernamesString = ''
    for (let i = 0; i < userList.length; i++) {
      usernamesString += userList[i].username
      if (i - 1 === userList.length) {
        usernamesString += ','
      }
    }
    return usernamesString
  }

  shorten (text) {
    if (text.length > 12) {
      return text.substring(0, text.length - 9) + '...'
    }

    return text
  }

  render () {
    const { chat, openChat } = this.props
    return (
      <div>
        <div className="chat" key={'chat' + chat.id} onClick={() => openChat(chat.id)}>
          <div className="header">
            <img
              src={
                chat.users.length > 2
                  ? '/public/group.png'
                  : chat.users[1].avatar
              }
              alt=""
            />
            <div>
              <h2>{this.shorten(this.usernamesToString(chat.users))}</h2>
              <span>{chat.lastMessage && chat.lastMessage.text ? this.shorten(chat.lastMessage.text) : '无'}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
