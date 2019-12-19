import React, { Component, createContext } from 'react'
import { ApolloConsumer } from '@apollo/react-components'

const { Provider, Consumer } = createContext()

export class UserProvider extends Component {
  render () {
    const { children } = this.props
    const user = {
      username: 'Test User',
      avatar: '/uploads/avatar1.png'
    }

    return (
      <Provider value={user}>
        {children}
      </Provider>
    )
  }
}

export class UserConsumer extends Component {
  render () {
    const { children } = this.props
    return (
      <ApolloConsumer>
        {
          client => React.Children.map(children, child => {
            const user = {
              username: 'Test User',
              avatar: '/uploads/avatar1.png'
            }
            return React.cloneElement(child, { user })
          })
        }
      </ApolloConsumer>
    )
  }
}
