import React, { Component } from 'react'

export default class SearchList extends Component {
  state = {
    showList: this.checkLength(this.props.users)
  }
  
  closeList = () => {
    this.setState({ showList: false })
  }

  checkLength = (users) => {
    if (users.length > 0) {
      document.addEventListener('click', this.closeList)
      return true
    } else {
      return false
    }
  }

  showList = (users) => {
    if (this.checkLength(users)) {
      this.setState({
        showList: true
      })
    } else {
      this.closeList()
    }
  }

  componentWillReceiveProps (nextProps) {
    this.showList(nextProps.users)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.closeList)
  }

  render () {
    const { users } = this.props
    const { showList } = this.state

    return (
      showList &&
      <div className="result">
        {
          users.map(user => (
            <div className="user" key={user.id}>
              <img src={user.avatar} alt=""/>
              <span>{user.username}</span>
            </div>
          ))
        }
      </div>
    )
  }
}
