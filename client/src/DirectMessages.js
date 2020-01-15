import React, { Component } from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Post from './Posts_utils.js'
import Todo from './to-do-list.js'
import { Button, Badge } from 'antd'
import DirectMessagesPostbar from './DirectMessagesPostbar'
//This will be the direct messages mainframe
class DirectMsg extends Component {
  constructor() {
    super()
    this.state = {
      receiver: 'Bob',
      sender: 'Charlie',
      notifications: 9999, //Stores number of notifications  
      items: {},
    }

  }
  render() {
    return (
      <div id='All'>
        <div id='header'>
          <h1 id='Category'>{this.state.receiver}
            <span id='Status'>
              <Button type='primary' size='small' id='pfp' onClick={this.changeUser = () => {
                this.state.sender === 'Charlie' ? this.setState({ sender: 'YEET6' }) : this.setState({ sender: 'Charlie' })
                  ; alert('User Changed')
              }}></Button>
            </span>
          </h1>
          <br />
        </div>{/*Div for id 'Header */}
        <DirectMessagesPostbar sender={this.state.sender} receiver={this.state.receiver} />
        {/*div for 'all*/}
      </div>
    )
  }
}


export default DirectMsg