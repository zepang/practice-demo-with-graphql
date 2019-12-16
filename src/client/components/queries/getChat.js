import React, { Component } from 'react'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'

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

export default class getChat extends Component {
  render () {
    const { variables, children } = this.props
    return (
      <Query
        query={GET_CHAT}
        variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return error.message
          const { chat } = data

          return React.Children.map(children, child => {
            return React.cloneElement(child, { chat })
          })
        }}
      </Query>
    )
  }
}
