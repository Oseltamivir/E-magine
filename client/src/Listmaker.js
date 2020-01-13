// Makes a list for js
import React, {Component} from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Post from './Posts_utils.js'
import {Button,Divider,Icon} from 'antd'


class Listmaker extends Component{
    constructor(prop){
        super(prop)
    }
    
    postTime = (items) => {
        let d =  new Date()
        return items.user+' posted this at '+d.toDateString()
       
    }
createItem = (items) => {
    return (
        <li key = {items.key}>
            <div className= 'listpart'>
                <p className = 'timetext'>{this.postTime(items)}</p>
                <p className = 'replytext'>{items.text}</p>
            </div>

            <Button type = {'danger'} onClick = {() => {this.props.deleteItem(items.key)}}>Delete
            </Button>
            <br/>
        </li>
        );
    }
    render(){
        const toDoEntries = this.props.entries;
        const toDoAnswers =  this.props.answers
       const listItems = toDoEntries.map(this.createItem);
       const listAnswers = toDoAnswers.map(this.createItem)
        return (
        <div id = 'listdesign'>
            <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Answers</span>
                    <Icon type="star" theme="twoTone" />
            </Divider>
            <ul id ='answerlist' >{listAnswers}</ul>
            <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Replies</span>
                    <Icon type="edit" theme="twoTone" />
            </Divider>
             <ul id = 'replylist'>{listItems}</ul>
        </div>
        )
    }
}
export default Listmaker