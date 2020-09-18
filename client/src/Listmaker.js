// Makes a list for js
import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Divider, Icon } from 'antd'


class Listmaker extends Component {
    constructor (props) {
        super(props);

        this.state = {
            users: {}
        }
        this.pending = [];
    }

    fetchUser (items) {
        if (this.pending.includes(items.author)) return;
        if (this.state.users.hasOwnProperty(items.author)) return;

        console.log(this.pending);
        this.pending.push(items.author);
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
        if (items.author === this.props.user) {
            return (
                <li key={items.id}>
                    <div>
                        <p className='timetext'>{this.postTime(items)}</p>
                        <p className='replytext'>{items.content}</p>
                    </div>
                    <span>
                       <p onClick={() => { this.props.deleteItem(items.id) }} style = {{color:'#ff4422',fontSize:'120%',float:'right'}}>X</p>
                    </span>
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
            );
        }
    }
    createAnswers = (items) => {
        if (items.author === this.props.user) {
            return (
                <li key={items.id}>
                    <div className='listpart'>
                        <p className='timetext'>{this.postTime(items)}</p>
                        <p className='replytext'>{items.content}</p>
                    </div>
                    <span>
                        <span class='votearea'>
                            <Button onClick={() => { this.props.upvoteAnswer(items.id) }} type='primary'>
                                <Icon type="up-circle" theme="twoTone" />
                            </Button>
                            <p class='whittencounter'>
                                {0}
                            </p>
                            <Button
                                onClick={() => { this.props.downvoteAnswer(items.id) }} type='primary'>
                                <Icon type="down-circle" theme="twoTone" />
                            </Button>
                        </span>
                    </span>
                    <br />
                </li>
            );
        }
        else {
            return (
                <li key={items.id}>
                    <div className='listpart'>
                        <p className='timetext'>{this.postTime(items)}</p>
                        <p className='replytext'>{items.content}</p>
                    </div>
                    <span class='votearea'>
                        <Button onClick={() => { this.props.upvoteAnswer(items.id) }} type='primary'>
                            <Icon type="up-circle" theme="twoTone" />
                        </Button>
                        <p className='whittencounter'>
                            {0}
                        </p>
                        <Button onClick={() => { this.props.downvoteAnswer(items.id) }} type='primary'>
                            <Icon type="down-circle" theme="twoTone" />
                        </Button>
                    </span>
                    <br />
                </li>
            )
        }
    }
    render() {
        console.log(this.props.post)
        console.log(this.props.answers)
        const toDoEntries = this.props.post;
        const toDoAnswers = this.props.answers;
        const listItems = toDoEntries.map(this.createItem);
        const listAnswers = toDoAnswers.map(this.createAnswers)
        return (
            <div id='listdesign'>
                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Answers</span>
                    <Icon type="star" theme="twoTone" />
                </Divider>
                <ul id='answerlist' >{listAnswers}</ul>
                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Replies</span>
                    <Icon type="edit" theme="twoTone" />
                </Divider>
                <ul id='replylist'>{listItems}</ul>
            </div>
        )
    }
}
export default Listmaker