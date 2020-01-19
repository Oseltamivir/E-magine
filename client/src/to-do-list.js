import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Input, Icon, Divider } from 'antd'
import Listmaker from './Listmaker.js'
import { NavLink } from 'react-router-dom';
const { TextArea } = Input
class Todo extends Component {
    constructor(prop) {
        super(prop)

        this.state = {
            data: this.props.data,
            token: this.props.token,
            items: [],
            currentState: { key: '', text: '', user: '', counter: '' },
            currentText: '',
            currentAnswers: { key: '', text: '', user: '', counter: '' },
            answerItems: [],
            messages: this.props.messages || [],
            posts: {},
            answers: {}
        }
    }

    componentDidMount() {
        this.fetchPostsData();
    }

    fetchPostsData() {
        if (this.state.messages.length == 0) {
            this.props.fetchMessageFromChannel(this.state.data.channel.id);
        }
    }

    createPost(text, type) {
        const msg = {
            timestamp: Date.now(),
            content: text,
            type: type
        }

        fetch(window.baseURL + `/api/v1/channels/${this.state.data.channel.id}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            },
            body: JSON.stringify(msg)
        })
    }

    upvoteAnswer = (key) => {
        let ind = this.state.answerItems.findIndex(x => x.key === key);
        const newAnswer = {
            key: this.state.answerItems[ind].key,
            text: this.state.answerItems[ind].text,
            user: this.state.answerItems[ind].user,
            counter: this.state.answerItems[ind].counter + 1
        }
        let changedItem = this.state.answerItems
        changedItem[ind] = newAnswer
        this.setState({ answerItems: changedItem })

    }

    downvoteAnswer = (key) => {
        let ind = this.state.answerItems.findIndex(x => x.key === key);
        const newAnswer = {
            key: this.state.answerItems[ind].key,
            text: this.state.answerItems[ind].text,
            user: this.state.answerItems[ind].user,
            counter: this.state.answerItems[ind].counter - 1
        }
        let changedItem = this.state.answerItems
        changedItem[ind] = newAnswer
        this.setState({ answerItems: changedItem })
    }
    deleteItem = (posts, id) => {
        const filteredItems = this.state.posts.filter(item => { return item.id !== id });
        this.setState({ posts: filteredItems })
    }
    deleteAnswer = (answers,id) => {
        const filteredAnswers = this.state.answerItems.filter(item => { return item.id !== id });
        this.setState({ answers: filteredAnswers })
    }
    addItem = (ev) => {
        ev.preventDefault();
        let newState = {
            key: Date.now() + this.props.user,
            text: this.state.currentText,
            user: this.props.user,
            counter: 0
        };
        if (newState.text !== '') {
            let item = [...this.state.items, newState];
            this.createPost(this.state.currentText, 0);
            this.setState({ currentState: newState, items: item, currentText: '' })
        }
        else { alert('Wrong Input') }
    }

    handleItem = (ev) => { this.setState({ currentText: ev.target.value }) }
    addAnswer = (ev) => {
        ev.preventDefault();
        let newState = {
            key: Date.now() + this.props.user,
            text: this.state.currentText,
            user: this.props.user,
            counter: 0
        };
        if (newState.text !== '') {
            let item = [...this.state.answerItems, newState];
            this.createPost(this.state.currentText, 1);
            this.setState({ currentAnswer: newState, answerItems: item, currentText: '' })
        }
        else { alert('Wrong Input') }
    }
    render() {
        let d = new Date()
        let post = this.state.messages.filter(msgs => { return msgs.type === 0 })
        let answers = this.state.messages.filter(msgs => { return msgs.type === 1 })
        if (this.state.user === this.state.poster) {
            return (
                <div className='todolist' >
                    {/*This is where dividers and question preview goes to */}
                    <div>
                        <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                            <span>Question </span>
                            <Icon type="question-circle" theme="twoTone" />
                        </Divider>
                        <p style={{ color: 'white' }}>Posted by {this.props.user} on {d.toDateString()}</p>
                        <div dangerouslySetInnerHTML={{ __html: this.state.data.channel.title }} className='title_preview'></div>
                        <div dangerouslySetInnerHTML={{ __html: this.state.data.channel.description }} className='preview'></div>
                        <Button type='primary' onClick={this.postOrEdit}><NavLink to={{ pathname: '/Posts_utils', state: { title: this.props.title, post: this.props.post } }}>Edit Post</NavLink></Button>

                        <span className='votearea'>
                            <Button type='primary' onClick={() => { this.upvoteQuestion() }}>
                                <Icon type="up-circle" theme="twoTone" />
                            </Button>
                            <p className='whittencounter'> {this.state.counter}</p>
                            <Button type='primary' onClick={() => { this.downvoteQuestion() }}>
                                <Icon type="down-circle" theme="twoTone" />
                            </Button>
                        </span>
                    </div>
                    <form onSubmit={this.addItem}>
                        <Listmaker
                            answers={this.state.answerItems}
                            post={post}
                            answers={answers}
                            deleteItem={this.deleteItem.bind(this)}
                            user={atob(localStorage.getItem('token').split('.')[0])}
                            upvoteAnswer={this.upvoteAnswer.bind(this)}
                            downvoteAnswer={this.downvoteAnswer.bind(this)}
                        />
                        <div id='Postbar'>
                            <TextArea id='Messaging' placeholder='Type something here' value={this.state.currentText} onChange={this.handleItem}></TextArea>

                            <Button id='posttwo' size='large' type='primary'
                                onClick={this.addItem}>Post</Button>
                            <Button id='postthree' size='large' type='primary'
                                onClick={this.addAnswer}>
                                <Icon type="star" theme="twoTone" />Add Answer
                        </Button>
                        </div>
                    </form>
                </div>
            )
        }
        else {
            let post = this.state.messages.filter(msgs => { return msgs.type === 0 })
            let answers = this.state.messages.filter(msgs => { return msgs.type === 1 })
            return (
                <div className='todolist' >
                    {/*This is where dividers and question preview goes to */}
                    <div>
                        <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                            <span>Question </span>
                            <Icon type="question-circle" theme="twoTone" />
                        </Divider>
                        <p style={{ color: 'white' }}>Posted by {this.props.user} on {d.toDateString()}</p>
                        <div dangerouslySetInnerHTML={{ __html: this.props.title }} className='preview'></div>
                        <div dangerouslySetInnerHTML={{ __html: this.props.post }} className='preview'></div>

                        <span className='votearea'>
                            <Button type='primary' onClick={() => { this.upvoteQuestion() }}>
                                <Icon type="up-circle" theme="twoTone" />
                            </Button>
                            <p className='whittencounter'> {this.state.counter}</p>
                            <Button type='primary' onClick={() => { this.downvoteQuestion() }}>
                                <Icon type="down-circle" theme="twoTone" />
                            </Button>
                        </span>
                    </div>
                    <form onSubmit={this.addItem}>
                        <Listmaker
                            answers={this.state.answerItems}
                            posts={post}
                            answers={answers}
                            deleteItem={this.deleteItem.bind(this)}
                            user={atob(localStorage.getItem('token').split('.')[0])}
                            upvoteAnswer={this.upvoteAnswer.bind(this)}
                            downvoteAnswer={this.downvoteAnswer.bind(this)}
                        />
                        <div id='Postbar'>
                            <TextArea id='Messaging' placeholder='Type something here' value={this.state.currentText} onChange={this.handleItem}></TextArea>

                            <Button id='posttwo' size='large' type='primary'
                                onClick={this.addItem}>Post</Button>
                            <Button id='postthree' size='large' type='primary'
                                onClick={this.addAnswer}>
                                <Icon type="star" theme="twoTone" />Add Answer
                </Button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}


export default Todo