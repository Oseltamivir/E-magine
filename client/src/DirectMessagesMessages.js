// Makes a list for js
import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Divider, Icon } from 'antd'



export default class DirectMessagesMessages extends Component {
    postTime = (items) => {
        let d = new Date()
        return this.props.receiver + ' posted this at ' + d.toDateString()

    }
    createItem = (items) => {
        return (
            <li key={items.key}>
                <div>
                    <p onClick={() => { this.props.deleteItem(items.key) }} style = {{marginLeft:'-20px', color:'#ff4422',fontSize:'120%', float:"left"}}>X</p>
                    <p className='timetext'>{this.postTime(items)}</p>
                    <p className='replytext'>{items.text}</p>
                </div>
                <span>
                </span>
                <br />
            </li>
        );
    }

    render() {
        const toDoEntries = this.props.entries;
        const listItems = toDoEntries.map(this.createItem);
        return (
            <div id='dmlistdesign'>
                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Your chat with {this.props.sender}
                        <Icon type="edit" theme="twoTone" />
                    </span>
                </Divider>
                <ul id='dmreplylist'>{listItems}</ul>
            </div>
        )
    }
}