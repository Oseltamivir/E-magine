import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Todo from './to-do-list.js'
import { message, Spin } from 'antd'



//This will be the discussion page mainframe
class DiscApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
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
      headers: { 'Content-Type': 'application/json', 'Authorization': this.state.token },
    }).then((results) => {
      return results.json(); //return data in JSON (since its JSON data)
    }).then((data) => {

      if (data.success === true) {
        this.setState({ data: data })
        message.error({ content: "Success" });
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
    var fromCreatePost = true;
    try { let x = this.props.location.state.channel_id; }
    catch (e) {
      if (e.name === "TypeError") {
        fromCreatePost = false
      }
    }

    if (fromCreatePost === true) { //For react-router hooks redirects
      this.setState({ channel_id: this.props.location.state.channel_id, token: this.props.location.state.token }, this.fetchChannelInfo.bind(this))
    }
    else { //For <NavLink> redirects
      this.setState({ channel_id: this.props.channel_id, token: this.props.token }, this.fetchChannelInfo.bind(this))
    }


  }
  render() {
    return (
      <div>
        {this.state.data && (
          <div id='All'>

            <div id='header'>
              <h1 id='Category'>{this.state.data.channel.topic}
              <p>List of members in channel: {this.state.data.channel.members}</p>
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
            <Todo token={this.state.user} data={this.state.data} />
            <br />
            {/*div for all*/}

          </div>
        )}
        {!this.state.data && (
          <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Spin size="large" />
          </div>
        )}
      </div>
    )
  }
}


export default DiscApp