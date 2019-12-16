import React, { Component } from 'react'
import UsersSearchQuery from '../queries/searchQuery'
import SearchList from './searchList'

export default class search extends Component {
  state = {
    text: ''
  }

  changeText = event => {
    this.setState({
      text: event.target.value
    })
  }

  render () {
    const { text } = this.state

    return (
      <div className="search">
        <input type="text" onChange={this.changeText} value={text}/>
        <UsersSearchQuery variable={{ text }}></UsersSearchQuery>
      </div>
    )
  }
}
