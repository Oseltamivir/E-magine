import React, { Component } from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import './discindex.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Todo from './to-do-list'
import { Button } from 'antd';
import { Tabs, Icon, Divider } from 'antd';
const { TabPane } = Tabs;

class Post extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      Postnote: '',
      PostTitle: '',
      fileName: '',
      postState: 'Post!',
      post: '',
      counter: 0,


    } //For storing text for post
    this.tabcontainer = { color: "white", backgroundColor: "#001529", boxShadow: "3px 3px 10px #0a0a0a" }
  }

  changeText = (ev) => {
    let val = ev.target.value;
    let nam = ev.target.name;
    this.setState({ [nam]: val })
  }

  postOrEdit = () => {
    this.state.postState === 'Post!' ? //Note ternary operator here
      this.setState({ postState: "Edit!" }) : this.setState({ postState: "Post!" })
  }

  upvoteQuestion = () => {
    this.setState({ counter: this.state.counter + 1 })
  }

  downvoteQuestion = () => {
    this.setState({ counter: this.state.counter - 1 })
  }


  componentDidMount() {
    var self = this;
    this.editor = new window.FroalaEditor('#exampl', {
      events: {
        contentChanged: function () {
          self.setState({ post: this.html.get() });
        },
        initialized: function () {
          this.html.set(self.state.post)
        }
      },
      attribution: false
    })
  }
  componentDidUpdate() {
    // create a variable to check if the thingy is open
    // if it is not and user is poster, create editor
    if (this.props.user === this.props.poster) {
      var self = this;
      this.editor = new window.FroalaEditor('#exampl',
        {
          events: {
            contentChanged: function () {
              self.setState({ post: this.html.get() });
            },
            initialized: function () {
              this.html.set(self.state.post)
            }
          },
          attribution: false
        })
    }
  }
  render() {
    let ifPosted = ''
    let d = new Date()
    if (this.state.postState === 'Edit!') {
      ifPosted = <p className='whiteright'>Posted by {this.props.poster} on {d.toDateString()}</p>
    }
    else {
      ifPosted = '';
    }
    if (this.props.user === this.props.poster && this.state.postState !== 'Edit!') {
      return (
        <div id='postall'>
          <Tabs defaultActiveKey="1" tabBarStyle={this.tabcontainer}>
            <TabPane tab={
              <span>
                <Icon type="edit" theme="twoTone" />
                Posting
                </span>
            }
              key='1'>
              <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                <span>Your post</span>
                <Icon type="edit" theme='twoTone'></Icon>
              </Divider>

              <form onSubmit={this.func = (ev) => { ev.preventDefault(); alert('Posted!') }}>
                <div id='exampl'></div>
                <br />
                <Button type='primary' onClick={this.postOrEdit}>{this.state.postState}</Button>
                {ifPosted}
              </form>

            </TabPane>
            <TabPane tab={
              <span>
                <Icon type="camera" theme="twoTone" />
                Preview
            </span>}
              key='2'>
              <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                <span>Preview </span>
                <Icon type="camera" theme='twoTone'></Icon>
              </Divider>

              <div dangerouslySetInnerHTML={{ __html: this.state.post }} className='preview'></div>
            </TabPane>
          </Tabs>
        </div>

      )
    }
    else {
      if (this.props.user === this.props.poster) {
        return (
          <div>
            <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
              <span>Question </span>
              <Icon type="question-circle" theme="twoTone" />
            </Divider>
            <p style = {{color: 'white'}}>Posted by {this.props.user} on {d.toDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: this.state.post }} className='preview'></div>
            <Button type='primary' onClick={this.postOrEdit}>Edit Post</Button>

            <span class='votearea'>
              <Button type='primary' onClick={() => { this.upvoteQuestion() }}>
                <Icon type="up-circle" theme="twoTone" />
              </Button>
              <p className='whittencounter'> {this.state.counter}</p>
              <Button type='primary' onClick={() => { this.downvoteQuestion() }}>
                <Icon type="down-circle" theme="twoTone" />
              </Button>
            </span>

            <Todo user={this.props.user} />
          </div>)
      }
      else {
        return (
          <div>
            <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
              <span>Question </span>
              <Icon type="question-circle" theme="twoTone" />
            </Divider>
            <p style = {{color: 'white'}}>Posted by {this.props.user} on {d.toDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: this.state.post }} className='preview'></div>

            <span class='votearea'>
              <Button type='primary' onClick={() => { this.upvoteQuestion() }}>
                <Icon type="up-circle" theme="twoTone" />
              </Button>
              <p className='whittencounter'> {this.state.counter}</p>
              <Button type='primary' onClick={() => { this.downvoteQuestion() }}>
                <Icon type="down-circle" theme="twoTone" />
              </Button>
            </span>

            <Todo user={this.props.user} />
          </div>)
      }
    }
  }
}
export default Post


