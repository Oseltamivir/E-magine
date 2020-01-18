import React, { Component } from 'react';
import './DiscApp.css';
import './discindex.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';
import { Tabs, Icon, Divider, Input, Select, message } from 'antd';
const { TabPane } = Tabs;

const { Option } = Select;

export default class CreatePost extends Component {
    constructor(props) {
        super(props)


        this.state = {
            token: this.props.token,
            fileName: '',
            postState: 'Post!',
            post: '',
            user: 'Bob',
            title: '',
            topic: '',


        } //For storing text for post
        this.tabcontainer = { color: "white", backgroundColor: "#001529", boxShadow: "3px 3px 10px #0a0a0a" }
    }
    changeText = (ev) => { let val = ev.target.value; let nam = ev.target.name; this.setState({ [nam]: val }) }

    createPost() { //Fetch profile info
        fetch(window.baseURL + '/api/v1/channels', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.state.token },
            body: JSON.stringify({
                "type": 0,
                "timestamp": Date.now(),
                "description": this.state.post,
                "title": this.state.title,
                "topic": this.state.topic,
            })
        }).then((results) => {
            return results.json(); //return data in JSON (since its JSON data)
        }).then((data) => {
            this.setState({ errorFetch: false })

            if (data.success === true) {
                alert("Post Created")
                alert(data.id)
            }
            else {
                message.error({ content: "Oops... Form fields cannot be left blank" });
            }

        }).catch((error) => {
            message.error({ content: "Oops, connection error" });
        })
    }

    componentDidMount() {
        var self = this;
        this.editor = new window.FroalaEditor('#createexampl', {
            events: {
                contentChanged: function () {
                    self.setState({ post: this.html.get() });
                },
                initialized: function () {
                    this.html.set(self.state.post)
                }
            },
            attribution: false
        })
    }
    componentDidUpdate() {
        // create a variable to check if the thingy is open
        // if it is not and user is poster, create editor
        var self = this;
        this.editor = new window.FroalaEditor('#createexampl',
            {
                events: {
                    contentChanged: function () {
                        self.setState({ post: this.html.get() });
                    },
                    initialized: function () {
                        this.html.set(self.state.post)
                    }
                },
                attribution: false
            })
    }

    handleTitle(e) {
        this.setState({ title: e.target.value })
    }

    topicOnChange(e) {
        this.setState({ topic: e })
    }

    render() {
        let ifPosted = ''
        let d = new Date()
        if (this.state.postState === 'Edit!') {
            ifPosted = <p className='whiteright'>Posted by {this.state.user} on {d.toDateString()}</p>
        }
        else {
            ifPosted = '';
        }
        return (
            <div id='createpostall'>
                <Tabs defaultActiveKey="1" tabBarStyle={this.tabcontainer}>
                    <TabPane tab={
                        <span>
                            <Icon type="edit" theme="twoTone" />
                            Posting
                </span>
                    }
                        key='1'>
                        <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                            <span>Your post</span>
                            <Icon type="edit" theme='twoTone'></Icon>
                        </Divider>

                        <Input onChange={this.handleTitle.bind(this)} value={this.state.title} placeholder="Enter question title..." />
                        <Select value={this.state.topic} onChange={this.topicOnChange.bind(this)} defaultValue="Mathematics" style={{ width: "20vw" }}>
                            <Option value="Mathematics">Mathematics</Option>
                            <Option value="Physics">Physics</Option>
                            <Option value="Economics">Economics</Option>
                            <Option value="Chemistry">Chemistry</Option>
                            <Option value="Biology">Biology</Option>
                            <Option value="Computing">Computing</Option>
                        </Select>
                        <div id='createexampl'></div> {/*Text Editor*/}
                        <Button type='primary' onClick={this.createPost.bind(this)}>{this.state.postState}</Button>
                        {ifPosted}

                    </TabPane>
                    <TabPane tab={
                        <span>
                            <Icon type="camera" theme="twoTone" />
                            Preview
            </span>}
                        key='2'>
                        <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                            <span>Preview </span>
                            <Icon type="camera" theme='twoTone'></Icon>
                        </Divider>
                        <div className='qntitle' dangerouslySetInnerHTML={{ __html: this.state.title }}></div>
                        <div dangerouslySetInnerHTML={{ __html: this.state.post }} className='preview'></div>
                    </TabPane>
                </Tabs>
            </div>

        )
    }
}

