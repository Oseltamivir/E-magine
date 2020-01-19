// Makes a list for js
import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Divider, Icon } from 'antd'


class Listmaker extends Component {
    postTime = (items) => {
        let d = new Date(items.timestamp)
        return items.user + ' posted this at ' + d.toDateString()
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
        if (items.user === this.props.user) {
            return (
                <li key={items.key}>
                    <div className='listpart'>
                        <p className='timetext'>{this.postTime(items)}</p>
                        <p className='replytext'>{items.text}</p>
                    </div>
                    <span>
                        <span class='votearea'>
                            <Button onClick={() => { this.props.upvoteAnswer(items.key) }} type='primary'>
                                <Icon type="up-circle" theme="twoTone" />
                            </Button>
                            <p class='whittencounter'>
                                {items.counter}
                            </p>
                            <Button
                                onClick={() => { this.props.downvoteAnswer(items.key) }} type='primary'>
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
                <li key={items.key}>
                    <div className='listpart'>
                        <p className='timetext'>{this.postTime(items)}</p>
                        <p className='replytext'>{items.text}</p>
                    </div>
                    <span class='votearea'>
                        <Button onClick={() => { this.props.upvoteAnswer(items.key) }} type='primary'>
                            <Icon type="up-circle" theme="twoTone" />
                        </Button>
                        <p className='whittencounter'>
                            {items.counter}
                        </p>
                        <Button onClick={() => { this.props.downvoteAnswer(items.key) }} type='primary'>
                            <Icon type="down-circle" theme="twoTone" />
                        </Button>
                    </span>
                    <br />
                </li>
            )
        }
    }
    render() {
        const toDoEntries = this.props.entries;
        const toDoAnswers = this.props.answers
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