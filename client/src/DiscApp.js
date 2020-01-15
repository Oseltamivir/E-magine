import React, {Component} from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Post from './Posts_utils.js'
import Todo from './to-do-list.js'
import {Button, Badge} from 'antd'
//This will be the discussion page mainframe
class DiscApp extends Component{
  constructor(){
    super()
    this.state = {
                  user: 'YEET6',
                  category: 'Math', // For storing category
                  notifications:9999 , //Stores number of notifications  
                  poster: 'YEET6',
                  items : {},                                
                                  }
              
  }
  render(){
    return(
      <div id = 'All'>
      <div id = 'header'>
      <h1 id = 'Category'>{this.state.category}
      <span id = 'Status'>
      <Button type = 'primary' size = 'small' id = 'pfp' onClick = {this.changeUser = () =>{
        this.state.user === 'user'? this.setState({user:'YEET6'}):this.setState({user:'user'})
      ;alert('User Changed')
      }}></Button>   
      </span>
      </h1>
      <br/>
      </div>{/*Div for id 'Header */}
      
      

      {/*Posting utilities here*/}
      <Post user = {this.state.user} poster = {this.state.poster}/>
      <br/>
      {/*div for 'all*/}
    </div> 
   )
    }
  }


export default DiscApp