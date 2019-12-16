import React from 'react'
import { Helmet } from 'react-helmet'
import Feed from './Feed'
import Chats from './Chats'
import './components/fontawesome'
import DropDown from './components/helpers/dropdown'

export default class App extends React.Component {
  render () {
    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta name="description" content="Newsfeed of all your friends on Graphbook"/>
        </Helmet>

        <Feed></Feed>

        <Chats></Chats>

        <DropDown trigger="123">
          <div>456788fdgfgfg</div>
        </DropDown>
      </div>
    )
  }
}
