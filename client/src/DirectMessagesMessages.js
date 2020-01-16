// Makes a list for js
import React, { Component } from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Post from './Posts_utils.js'
import { Button, Divider, Icon } from 'antd'



export default class DirectMessagesMessages extends Component {
    constructor(prop) {
        super(prop)
    }

    postTime = (items) => {
        let d = new Date()
        return this.props.sender + ' posted this at ' + d.toDateString()

    }
    createItem = (items) => {
        return (
            <li key={items.key}>
                <div>
                    <p className='timetext'>{this.postTime(items)}</p>
                    <p className='replytext'>{items.text}</p>
                </div>
                <span>
                    <Button type={'danger'} onClick={() => { this.props.deleteItem(items.key) }}>Delete
                    </Button>
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
                    <span>Your chat with {this.props.receiver}
                        <Icon type="edit" theme="twoTone" />
                    </span>
                </Divider>
                <ul id='dmreplylist'>{listItems}</ul>
            </div>
        )
    }
}