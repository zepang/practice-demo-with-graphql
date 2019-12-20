import React from 'react'
import { Helmet } from 'react-helmet'
import Feed from './Feed'
import Chats from './Chats'
import Bar from './components/bar'
import './components/fontawesome'
import DropDown from './components/helpers/dropdown'
import LoginRegister from './components/loginregister'
// import { UserProvider } from './components/context/user'

export default class App extends React.Component {
  state = {
    loggedIn: false
  }

  componentWillMount () {
    const token = localStorage.getItem('jwt')

    if (token) {
      this.setState({ loggedIn: true })
    }
  }

  changeLoginState = loggedIn => {
    this.setState({ loggedIn })
  }

  render () {
    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta name="description" content="Newsfeed of all your friends on Graphbook"/>
        </Helmet>
        {
          this.state.loggedIn
            ? <div>
              <Bar></Bar>
              <Feed></Feed>
              <Chats></Chats>
            </div>
            : <LoginRegister changeLoginState={this.changeLoginState}></LoginRegister>
        }
        {/* <DropDown trigger="123">
          <div>456788fdgfgfg</div>
        </DropDown> */}
      </div>
    )
  }
}
