import React, { Component } from 'react'
import PropTypes from 'prop-types';
import PostContent from './content'
import PostHeader from './header'
import PostForm from './form'
import UpdatePostMutation from '../mutations/updatePost'

export default class Post extends Component {
  static propTypes = {
    /** Object containing the complete post */
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

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
