import React, { Component } from 'react'

import ChatsList from './components/chat/list'
import GetChatsQuery from './components/queries/getChats'

import GetChatQuery from './components/queries/getChat'
import ChatWindow from './components/chat/window'
import AddMessageMutation from './components/mutations/addMessage'
import MessageInput from './components/chat/messageInput'

export default class Chats extends Component {
  state = {
    openChats: [],
    textInputs: {}
  }

  openChat = id => {
    let openChats = this.state.openChats.slice()
    const textInputs = Object.assign({}, this.state.textInputs)

    if (openChats.indexOf(id) === -1) {
      if (openChats.length > 2) {
        openChats = openChats.slice(1)
      }
      openChats.push(id)
      textInputs[id] = ''
    }

    this.setState({ openChats, textInputs })
  }

  closeChat = (id) => {
    const openChats = this.state.openChats.slice()
    const textInputs = Object.assign({}, this.state.textInputs)
    const index = openChats.indexOf(id)
    openChats.splice(index, 1)
    delete textInputs[id]
    this.setState({ openChats, textInputs })
  }

  onChangeChatInput = (e, id) => {
    e.preventDefault()
    const textInputs = Object.assign({}, this.state.textInputs)
    textInputs[id] = e.target.value
    this.setState({ textInputs })
  }

  handleKeyPress = (e, id, addMessage) => {
    const self = this
    const textInputs = Object.assign({}, this.state.textInputs)
    if (e.key === 'Enter' && textInputs[id].length) {
      addMessage({ variables: { message: { text: textInputs[id], chatId: id } } }).then(() => {
        textInputs[id] = ''
        self.setState({ textInputs })
      })
    }
  }

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
    const { openChats, textInputs } = this.state
    return (
      <div className="wrapper">
        <div className="chats">
          <GetChatsQuery>
            <ChatsList openChat={this.openChat}></ChatsList>
          </GetChatsQuery>
        </div>

        <div className="openChats">
          {openChats.map((chatId, i) =>
            <GetChatQuery variables={{ chatId }} key={chatId}>
              <ChatWindow closeChat={this.closeChat}>
                <AddMessageMutation>
                  <MessageInput
                    textInputs={textInputs}
                    onChangeChatInput={this.onChangeChatInput}
                    handleKeyPress={this.handleKeyPress}></MessageInput>
                </AddMessageMutation>
              </ChatWindow>
            </GetChatQuery>
            // <Query
            //   key={'chatWindow' + chatId}
            //   query={GET_CHAT}
            //   variables={{ chatId }}>
            //   {({ loading, error, data }) => {
            //     if (loading) return <p>Loading...</p>
            //     if (error) return error.message
            //     const { chat } = data
            //     return (
            //       <div className="chatWindow">
            //         <div className="header">
            //           <span>{chat.users[1].username}</span>
            //           <button className="close">X</button>
            //         </div>
            //         <div className="messages">
            //           {chat.messages.map((message, i) =>
            //             <div key={'message' + message.id}
            //               className={'message ' + (message.user.id > 11 ? 'left' : 'right')}>
            //               {message.text}
            //             </div>
            //           )}
            //         </div>
            //         <Mutation mutation={ADD_MESSAGE}
            //           update={(store, { data: { addMessage } }) => {
            //             const data = store.readQuery({ query: GET_CHAT, variables: { chatId: chat.id } })
            //             data.chat.messages.push(addMessage)

            //             store.writeQuery({ query: GET_CHAT, variables: { chatId: chat.id }, data })
            //           }}>
            //           {
            //             addMessage => (
            //               <div className="input">
            //                 <input type="text"
            //                   value={textInputs[chat.id]}
            //                   onChange={e => self.onChangeChatInput(e, chat.id)}
            //                   onKeyPress={e => self.handleKeyPress(e, chat.id, addMessage)}/>
            //               </div>
            //             )
            //           }
            //         </Mutation>
            //       </div>
            //     )
            //   }}
            // </Query>
          )}
        </div>
      </div>
    )
  }
}
