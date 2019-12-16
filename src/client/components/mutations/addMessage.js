import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from '@apollo/react-components'

const GET_CHAT = gql`
query chat($chatId: Int!) {
  chat (chatId: $chatId) {
    id
    users {
      id
      avatar
      username
    }
    messages {
      id
      text
      user {
        id
      }
    }
  }
}`

const ADD_MESSAGE = gql`
  mutation addMessage ($message: MessageInput!) {
    addMessage (message: $message) {
      id
      text
      user {
        id
      }
    }
  }
`

export default class AddMessageMutation extends Component {
  render () {
    const { children, chat } = this.props
    return (
      <Mutation mutation={ADD_MESSAGE}
        update={(store, { data: { addMessage } }) => {
          const data = store.readQuery({ query: GET_CHAT, variables: { chatId: chat.id } })
          data.chat.messages.push(addMessage)

          store.writeQuery({ query: GET_CHAT, variables: { chatId: chat.id }, data })
        }}>
        {
          addMessage => {
            return React.Children.map(children, child => {
              return React.cloneElement(child, { addMessage, chat })
            })
          }
        }
      </Mutation>
    )
  }
}
