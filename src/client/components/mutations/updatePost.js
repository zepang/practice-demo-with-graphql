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

const UPDATE_POST = gql`
mutation updatePost ($post: PostInput!, $postId: Int!) {
  updatePost (post: $post, postId: $postId) {
    id
    text
  }
}
`

export default class UpdatePostMutation extends Component {
  state = {
    postContent: this.props.post.text
  }

  changePostContent = value => {
    this.setState({ postContent: value })
  }

  render () {
    const { children } = this.props
    const { postContent } = this.state
    const postId = this.props.post.id
    const variables = {
      page: 0,
      limit: 10
    }
    return (
      <Mutation
        update={(store, { data: { updatePost } }) => {
          var query = {
            query: GET_POSTS
          }
          if (typeof variables !== typeof undefined) {
            query.variables = variables
          }

          const data = store.readQuery(query)
          for (let i = 0; i < data.postsFeed.posts.length; i++) {
            if (data.postsFeed.posts[i].id === postId) {
              data.postsFeed.posts[i].text = updatePost.text
              break
            }
          }

          store.writeQuery({ ...query, data })
        }}
        optimisticResponse={{
          __typename: 'mutation',
          updatePost: {
            __typename: 'Post',
            text: postContent,
            id: postId
          }
        }}
        mutation={UPDATE_POST}>
        {
          updatePost => (
            React.Children.map(children, child => {
              return React.cloneElement(child, { updatePost, postContent, postId, changePostContent: this.changePostContent })
            })
          )
        }
      </Mutation>
    )
  }
}
