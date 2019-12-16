import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from '@apollo/react-components'

const GET_POSTS = gql`
query postsFeed($page: Int, $limit: Int) {
  postsFeed(page: $page, limit: $limit) {
    posts {
      id
      text
      user {
      avatar
      username
      }
    }
  }
}
`

const DELETE_POST = gql`
mutation deletePost($postId: Int!) {
  deletePost(postId: $postId) {
    success
  }
}
`

export default class DeletePostMutation extends Component {
  render () {
    const { children } = this.props
    const postId = this.props.post.id
    const variables = { page: 0, limit: 10 }
    return (
      <Mutation
        update={(store, { data: { deletePost: { success } } }) => {
          if (success) {
            var query = {
              query: GET_POSTS
            }
            if (typeof variables !== typeof undefined) {
              query.variables = variables
            }
            const data = store.readQuery(query)
            const postsFeed = data.postsFeed
            postsFeed.posts = postsFeed.posts.filter(post => post.id !== postId)
            // 如果没有下边的代码告知postsFeed已经更新可能会出现cache更新，组件不会重新渲染
            data.postsFedd = { ...postsFeed }
            store.writeQuery({ ...query, data })
          }
        }}
        mutation={DELETE_POST}>
        {
          deletePost => (
            React.Children.map(children, child => {
              return React.cloneElement(child, { deletePost, postId })
            })
          )
        }
      </Mutation>
    )
  }
}
