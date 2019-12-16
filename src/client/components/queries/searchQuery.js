import React, { Component } from 'react'
import gql from 'graphql-tag'

import Loading from '../loading'
import Error from '../error'
import { Query } from '@apollo/react-components'

const GET_USERS = gql`
query usersSearch($page: Int, $limit: Int, $text: String!) {
  usersSearch(page: $page, limit: $limit, text: $text) {
    id
    avatar
    username
  }
}
`

export default class UsersSearchQuery extends Component {
  getVariables = () => {
    const { variables } = this.props
    const queryVariables = {
      page: 0,
      limit: 5,
      text: ''
    }
    if (typeof variables !== typeof undefined) {
      if (typeof variables.page !== typeof undefined) {
        queryVariables.page = variables.page
      }
      if (typeof variables.limit !== typeof undefined) {
        queryVariables.limit = variables.limit
      }

      if (typeof variables.text !== typeof undefined) {
        queryVariables.text = variables.text
      }
    }

    return queryVariables
  }

  render () {
    const { children } = this.props
    const variables = this.getVariables
    const skip = (variables.text.length < 3)
    return (
      <Query query={GET_USERS} variables={variables} skip={skip}>
        {
          ({ loading, error, data, fetchMore, refetch }) => {
            if (loading || error || typeof data === typeof undefined) {
              return null
            }

            const { usersSearch } = data
            const { users } = usersSearch

            return React.children.map(children, child => {
              return React.cloneElement(child, { users, fetchMore, variables, refetch })
            })
          }
        }
      </Query>
    )
  }
}
