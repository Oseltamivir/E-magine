import React, { Component } from 'react';
import logo from './logo.svg';
import './DirectMessages.css';
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
      <div id='dmall'>
        <div id='dmheader'>
          <h1 id='dmcategory'>{this.state.sender}
            <span id='dmstatus'>
              <Button type='primary' size='small' id='dmpfp' onClick={this.changeUser = () => {
                this.state.sender === 'Charlie' ? this.setState({ sender: 'YEET6' }) : this.setState({ sender: 'Charlie' })
                  ;
              }}></Button>
            </span>
          </h1>
          <br />
        </div>{/*Div for id 'Header */}
        <DirectMessagesPostbar sender={this.state.sender} receiver={this.state.receiver} func = {this.props.func} />
        {/*div for 'all*/}
      </div>
    )
  }
}


export default DirectMsg