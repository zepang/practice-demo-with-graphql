import React, { Component } from 'react'
import PostContent from './content'
import PostHeader from './header'
import PostForm from './form'
import UpdatePostMutation from '../mutations/updatePost'

export default class Post extends Component {
  state = {
    editing: false
  }

  changeState = () => {
    const { editing } = this.state
    this.setState({ editing: !editing })
  }

  render () {
    const { editing } = this.state
    const { post } = this.props
    return (
      <div className={'post ' + (post.id < 0 ? 'optimistic' : '')}>
        <PostHeader post={post} changeState={this.changeState}></PostHeader>
        {
          !editing && <PostContent post={post}></PostContent>
        }
        {
          editing && <UpdatePostMutation post={post}>
            <PostForm changeState={this.changeState}></PostForm>
          </UpdatePostMutation>
        }
      </div>
    )
  }
}
