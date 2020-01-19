// Makes a list for js
import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './streamchat.css'
import { Button, Divider, Icon } from 'antd'


export default class Streamlistmake extends Component {

    postTime = (items) => {
        let d = new Date()
        return items.user + ' posted this at ' + d.toDateString()

    }
    createItem = (items) => {
        if (this.props.user === items.user){
        return (
            <li key={items.key} className = 'list_component'>
                <div>
                <p onClick={() => { this.props.deleteItem(items.key) }} style = {{marginLeft:'-20px', color:'#ff4422',fontSize:'120%', float:"left"}}>X</p>
                    <p className='timetext'>{this.postTime(items)}</p>
                    <p className='replytext'>{items.text}</p>
                </div>
                <br />
            </li>
        );
        }
        else{
            return(
            <li key={items.key}>
                <div>
                    <p className='timetext'>{this.postTime(items)}</p>
                    <p className='replytext'>{items.text}</p>
                </div>
                <br />
            </li>
            )
        }
    }
    render() {
        const toDoStreamItems = this.props.entries;
        const streamListItems = toDoStreamItems.map(this.createItem);
        return (
            <div id='streamlistdesign'>
                <ul id='streamreplylist'>{streamListItems}</ul>
            </div>
        )
    }
}