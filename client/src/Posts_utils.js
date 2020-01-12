import React, {Component} from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import './discindex.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {Button,Input,Typography} from 'antd';
class Post extends Component{
    constructor(prop){
        super(prop)
        this.state = {Postnote: '',
                      PostTitle: '' ,
                      fileName: '',
                    postState:'Post!',
                    post: ''


                  } //For storing text for post
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
      if (this.editorOpen 
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
        <form id = 'post' onSubmit = {this.func = (ev) => {ev.preventDefault();alert('Posted!')}}>
        <div className = 'exampl'>
      </div>   
<Button id = 'spaceOut' type = 'primary' onClick = {this.postOrEdit}>{this.state.postState}</Button>
        <div dangerouslySetInnerHTML={{__html: this.state.post}}></div> {/* might want to remove later */}
</form>
{ifPosted}
</div>
      
        )
        }
      else{
        return(<div></div>)
      }
    }
}
export default Post


