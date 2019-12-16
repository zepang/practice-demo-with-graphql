import React from 'react'
import { Helmet } from 'react-helmet'

import FeedList from './components/post/feedlist'
import PostForm from './components/post/form'
import PostsFeedQuery from './components/queries/postsFeed'
import AddPostMutation from './components/mutations/addPost'

import '../../assets/css/style.css'

export default class Feed extends React.Component {
  state = {
    postContent: '',
    hasMore: true,
    page: 0
  }

  handlePostContentChange = (e) => {
    this.setState({
      postContent: e.target.value
    })
  }

  render () {
    const queryVariables = {
      page: 0,
      limit: 10
    }
    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta name="description" content="Newsfeed of all your all your friends on Graphbook"/>
        </Helmet>

        <AddPostMutation variables={queryVariables}>
          <PostForm></PostForm>
        </AddPostMutation>

        <PostsFeedQuery variables={queryVariables}>
          <FeedList></FeedList>
        </PostsFeedQuery>
      </div>
    )
  }
}
