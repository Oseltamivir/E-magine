// Makes a list for js
import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './streamchat.css'
import { Button, Divider, Icon } from 'antd'


export default class Streamlistmake extends Component {
    constructor (props) {
        super(props);

        this.state = {
            users: {}
        }
    }

    fetchUser (items) {
        if (this.state.users.hasOwnProperty(items.author)) return;
        fetch(window.baseURL + '/api/v1/users/' + items.author, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            const users = this.state.users;
            users[items.author] = data.profile.username;
            this.setState({users});
        });
    }

    postTime = (items) => {
        let d = new Date(items.timestamp)
        if (!this.state.users.hasOwnProperty(items.author)) this.fetchUser(items);
        return (this.state.users[items.author] || '') + ' posted this at ' + d.toDateString()
    }
    createItem = (items) => {
        if (this.props.author === items.author) {
            return (
                <li key={items.id} className='list_component'>
                    <div>
                        <Icon onClick={() => { this.props.deleteItem(items.id) }}
                            style={{ marginLeft: '-20px', color: '#ff4422', float: "left" }}
                            type="close-circle"
                            theme="twoTone"
                            twoToneColor='red'>
                        </Icon>
                        <p className='timetext'>{this.postTime(items)}</p>
                        <p className='replytext'>{items.content}</p>
                    </div>
                    <br />
                </li>
            );
        }
        else {
            return (
                <li key={items.id}>
                    <div>
                        <p className='timetext'>{this.postTime(items)}</p>
                        <p className='replytext'>{items.content}</p>
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