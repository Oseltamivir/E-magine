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

                  } //For storing text for post
    }
    changeText = (ev) =>{let val = ev.target.value;let nam =ev.target.name;this.setState({[nam]: val})}
    postOrEdit = () =>{this.state.postState === 'Post!'? this.setState({postState: "Edit!"}):this.setState({postState: "Post!"})}
    componentDidMount(){
      var editor = new window.FroalaEditor('.exampl')
    }
    componentDidUpdate(){
      var editor = new window.FroalaEditor('.exampl')
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
        <div class = 'exampl'>
      </div>   
<Button id = 'spaceOut' type = 'primary' onClick = {this.postOrEdit}>{this.state.postState}</Button>
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


