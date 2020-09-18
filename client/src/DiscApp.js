import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Todo from './to-do-list.js'
import { message, Button, Icon, Divider, Spin } from 'antd'

//This will be the discussion page mainframe
class DiscApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      token: '',
      channel_id: '',
      user: 'YEET6',
      category: 'Math', // For storing category
      notifications: 9999, //Stores number of notifications  
      poster: 'YEET6',
      items: {},
    }

  }

  fetchChannelInfo() {
    fetch(window.baseURL + '/api/v1/channels/' + this.state.channel_id, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
    }).then((results) => {
      return results.json(); //return data in JSON (since its JSON data)
    }).then((data) => {

      if (data.success === true) {
        this.setState({ data: data.channel })
        message.success({ content: "Loaded." });
        console.log(this.state.data)
      }
      else {
        message.error({ content: "Oops... unable to find post" });
      }

    }).catch((error) => {
      message.error({ content: "Oops, connection error" });
      message.error({ content: error });
    })
  }

  componentDidMount() {
    this.setState(
      {channel_id: this.props.match.params.channel_id},
      this.fetchChannelInfo.bind(this)
      )
  }
  render() {
    let d = new Date()
    return (
      <div>
          <div id='All'>

            <div id='header'>
              <h1 id='Category'>{this.state.data.topic}
                <span id='Status'>
                  {/*Button type='primary' size='small' id='pfp' onClick={this.changeUser = () => {
                this.state.user === 'user' ? this.setState({ user: 'YEET6' }) : this.setState({ user: 'user' })
                  ; alert('User Changed')
              }}></Button>*/}
                </span>
              </h1>
              <br />
            </div>{/*Div for id 'Header */}



            {/*Posting utilities here*/}
            
            <div className='todolist' >
              <div>
                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Question </span>
                    <Icon type="question-circle" theme="twoTone" />
                </Divider>
                <p style={{ color: 'white' }}>Posted by {this.props.user} on {d.toDateString()}</p>
                <div dangerouslySetInnerHTML={{ __html: this.state.data.title }} className='title_preview'></div>
                <div dangerouslySetInnerHTML={{ __html: this.state.data.description }} className='preview'></div>
                {/*<Button type='primary' onClick={this.postOrEdit}><NavLink to={{ pathname: '/Posts_utils', state: { title: this.props.title, post: this.props.post } }}>Edit Post</NavLink></Button>*/}

                <span className='votearea'>
                    <Button type='primary' onClick={() => { this.upvoteQuestion() }}>
                        <Icon type="up-circle" theme="twoTone" />
                    </Button>
                    <p className='whittencounter'> {this.state.counter}</p>
                    <Button type='primary' onClick={() => { this.downvoteQuestion() }}>
                        <Icon type="down-circle" theme="twoTone" />
                    </Button>
                </span>
              </div>
              <Todo token={this.state.user} channelID={this.props.match.params.channel_id} messages={this.props.messages[this.props.match.params.channel_id]} fetchMessageFromChannel={this.props.fetchMessageFromChannel}/>
            </div>
            <br />
            {/*div for all*/}

          </div>
        {/*Array.isArray(this.state.data.title) && (
          <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Spin size="large" />
          </div>
        )*/}
      </div>
    )
  }
}


export default DiscApp;