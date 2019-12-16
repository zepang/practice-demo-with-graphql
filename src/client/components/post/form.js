import React, { Component } from 'react'
import avatar1 from '../../static/AVATAR-ICONS-02_03.png'
import avatar2 from '../../static/AVATAR-ICONS-02_04.png'

export default class PostForm extends Component {
  handlePostContentChange = e => {
    this.props.changePostContent(e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { posts, postContent } = this.state
    const newPost = {
      id: posts.length + 1,
      text: postContent,
      user: {
        avatar: (posts.length + 1) % 2 ? avatar1 : avatar2,
        username: `Fake User-${posts.length + 1}`
      }
    }
    this.setState((prevState) => ({
      posts: [newPost, ...prevState.posts],
      postContent: ''
    }))
  }

  render () {
    const self = this
    const { addPost, postContent, updatePost, postId } = this.props

    return (
      <div className="postForm">
        <form onSubmit={e => {
          e.preventDefault()
          if (typeof updatePost !== typeof undefined) {
            updatePost({ variables: { post: { text: postContent }, postId } })
              .then(() => {
                self.props.changeState()
              })
          } else {
            addPost({ variables: { post: { text: postContent } } })
              .then(() => {
                self.setState((prevState) => ({
                  postContent: ''
                }))
              })
          }
        }}>
          <textarea
            value={postContent}
            onChange={this.handlePostContentChange}
            placeholder="Write your custom post!"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
