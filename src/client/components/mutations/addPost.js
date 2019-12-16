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

const ADD_POST = gql`
mutation addPost($post: PostInput!) {
  addPost(post: $post) {
    id
    text
    user {
      username
      avatar
    }
  }
}`

export default class AddPostMutation extends Component {
  state = {
    postContent: ''
  }

  changePostContent = (value) => {
    this.setState({ postContent: value })
  }

  render () {
    const self = this
    const { children, variables } = this.props
    const { postContent } = this.state
    return (
      <Mutation
        mutation={ADD_POST}
        update={(store, { data: { addPost } }) => {
          const query = {
            query: GET_POSTS
          }
          if (typeof variables !== typeof undefined) {
            query.variables = variables
          }
          const data = store.readQuery(query)
          data.postsFeed.posts.unshift(addPost)
          store.writeQuery({ ...query, data })
        }}
        optimisticResponse={{
          __typename: 'mutation',
          addPost: {
            __typename: 'Post',
            text: postContent,
            id: -1,
            user: {
              __typename: 'User',
              username: 'Loading...',
              avatar: '/public/loading.gif'
            }
          }
        }}>
        {addPost => (
          React.Children.map(children, function (child) {
            return React.cloneElement(child, { addPost, postContent, changePostContent: self.changePostContent })
          })
        )}
      </Mutation>
    )
  }
}
