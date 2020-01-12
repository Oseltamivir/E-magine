import React, {Component} from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import './discindex.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Todo from './to-do-list'
import {Button} from 'antd';
import { Tabs, Icon } from 'antd';
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
class Post extends Component{
    constructor(prop){
        super(prop)
        this.state = {Postnote: '',
                      PostTitle: '' ,
                      fileName: '',
                    postState:'Post!',
                    post: ''


                  } //For storing text for post
        this.tabcontainer = { color: "white", backgroundColor: "#001529", boxShadow: "3px 3px 10px #0a0a0a" }
        this.editorOpen = true;
    }
    changeText = (ev) =>{let val = ev.target.value;let nam =ev.target.name;this.setState({[nam]: val})}
    postOrEdit = () =>{this.state.postState === 'Post!'? this.setState({postState: "Edit!"}):this.setState({postState: "Post!"})}
    componentDidMount(){
      var self = this;
      this.editor = new window.FroalaEditor('.exampl', {
        events: {
          contentChanged: function() {
            self.setState({post: this.html.get()});
          }
        },
        attribution: false
      })
    }
    componentDidUpdate(){
      // create a variable to check if the thingy is open
      // if it is not and user is poster, create editor
      if (this.props.user === this.props.poster) this.editor = new window.FroalaEditor('.exampl')
    }
    render(){
        let ifPosted = ''
        let d = new Date()
        if  (this.state.postState === 'Edit!'){
          ifPosted = <p id = 'postright'>Posted by {this.props.poster} on {d.toDateString()}</p>
          }
            else{
               ifPosted = '';
          }
          if (this.props.user === this.props.poster)
        {
          return(
          <div id = 'postall'>
            <Tabs defaultActiveKey="1" onChange={callback} tabBarStyle={this.tabcontainer}>
              <TabPane  tab  ={
                <span>
                  <Icon type="edit" theme="twoTone" />
                   Posting
                </span>
                        } 
                        key = '1'>
              <form id = 'post' onSubmit = {this.func = (ev) => {ev.preventDefault();alert('Posted!')}}>
                <div className = 'exampl'>
                </div>   
                <Button id = 'spaceOut' type = 'primary' onClick = {this.postOrEdit}>{this.state.postState}</Button>
                <div dangerouslySetInnerHTML={{__html: this.state.post}}></div> {/* might want to remove later */}

                </form>
                {ifPosted}
            </TabPane>
            <TabPane tab = { 
            <span>
              <Icon type="camera" theme="twoTone" />
              Preview
            </span>} 
            key = '2'>
              <h1 className = 'white'>This is preview mode</h1>
              <br/>
              <h1 className = 'white'>Here is your code:</h1>
              <br/>
              <div dangerouslySetInnerHTML = {{__html: this.state.post}} className = 'white'></div>
              </TabPane>
           </Tabs>
          </div>
     
        )
        }
      else{
        return(
        <div>
            <Todo user = {this.state.user}/>
        </div>)
      }
    }
}
export default Post


