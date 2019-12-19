import React from 'react'
import { Helmet } from 'react-helmet'
import Feed from './Feed'
import Chats from './Chats'
import Bar from './components/bar'
import './components/fontawesome'
import DropDown from './components/helpers/dropdown'
// import { UserProvider } from './components/context/user'

export default class App extends React.Component {
  render () {
    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta name="description" content="Newsfeed of all your friends on Graphbook"/>
        </Helmet>

        {/* <UserProvider> */}
        <Bar></Bar>

        <Feed></Feed>

        <Chats></Chats>
        {/* </UserProvider> */}

        <DropDown trigger="123">
          <div>456788fdgfgfg</div>
        </DropDown>
      </div>
    )
  }
}
