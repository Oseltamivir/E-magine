import React from 'react';
import { Input, Icon, Button, Modal, Select, Tooltip, message } from 'antd';
import { useHistory } from 'react-router-dom';

const { Search, TextArea } = Input;
const { Option } = Select;

const selectBefore = (
    <Select defaultValue="https://www.youtube.com/" style={{ width: "18vw" }}>
        <Option value="https://www.youtube.com/">https://www.youtube.com/</Option>
        <Option value="https://www.twitch.tv/">https://www.twitch.tv/</Option>
    </Select>
);

var inputValues = {
    Link: "",
    Title: "",
    Desc: "",
    Topic: "",
}


function OkModal() { //Special hook function in order to use React Router's history.push 
    const history = useHistory();

    function HandleClick() {

        fetch(window.baseURL + '/api/v1/channels', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify({
                "type": 1,
                "timestamp": Date.now(),
                "streamURL": inputValues.Link,
                "title": inputValues.Title,
                "description": inputValues.Desc,
                "topic": inputValues.Topic
            })
        }).then((results) => {
            return results.json(); //return data in JSON (since its JSON data)
        }).then((data) => {


            if (data.success === true) {
                message.success({content: "Stream created with id: " + data.id})
                //history.push({pathname: "/DiscApp", state: { channel_id: data.id, token: token}});
            }
            else {
                message.error({ content: "Oops... Form fields cannot be left blank" });
            }


        }).catch((error) => {
            message.error({ content: "Oops, connection error" });
        })

    }

    return (
        <Button type='primary' onClick={HandleClick}>Create Stream</Button>
    );
}

class StreamsTopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            Link: "",
            Title: "",
            Desc: "",
            Topic: "",
        };
    }

    linkOnChange(e) {
        this.setState({ Link: e.target.value })
        inputValues.Link = e.target.value
    }
    titleOnChange(e) {
        this.setState({ Title: e.target.value })
        inputValues.Title = e.target.value
    }
    descOnChange(e) {
        this.setState({ Desc: e.target.value })
        inputValues.Desc = e.target.value
    }
    topicOnChange(e) {
        this.setState({ Topic: e })
        inputValues.Topic = e
    }

    showModal() {
        this.setState({ visible: true })
    }

    render() {
        return (
            <div id="TopOptions" style={{ display: "flex" }}>
                <Button type="primary" size="large" style={{ marginRight: "0" }} onClick={this.showModal.bind(this)}>
                    Create Stream
                    <Icon type="plus" />
                </Button>
                <Search
                    placeholder="Search homework streams by people all across the globe!"
                    enterButton="Search"
                    size="large"
                    onSearch={value => console.log(value)}
                    allowClear
                    style={{ width: "50vw", marginLeft: "2vw", backgroundColor: "#002140" }}
                />
                <Modal
                    title="Create Stream"
                    footer={null}
                    visible={this.state.visible}
                    centered={true}
                    okText="Start Stream"
                >
                    <h3>Youtube/Twitch Stream Link</h3>
                    <Tooltip placement="bottomRight" title={<p>Paste the end part of the YouTube/Twitch stream link <br />(E.g watch?v=SIGQSgifs6s or twitchChannelName )</p>}>
                        <Input onChange={this.linkOnChange.bind(this)} value={this.state.Link} addonBefore={selectBefore} placeholder="Enter end part" />
                    </Tooltip>

                    <h3 style={{ marginTop: "3vh" }}>Stream Title</h3>
                    <Input onChange={this.titleOnChange.bind(this)} value={this.state.Title} placeholder="E.g Vectors Revision!" />

                    <h3 style={{ marginTop: "3vh" }}>Stream Description</h3>
                    <TextArea onChange={this.descOnChange.bind(this)} value={this.state.Desc} allowClear placeholder="E.g Revision before CA1!" rows={5} />

                    <h3 style={{ marginTop: "3vh" }}>Topic</h3>
                    <Select value={this.state.Topic} onChange={this.topicOnChange.bind(this)} defaultValue="Mathematics" style={{ width: "20vw" }}>
                        <Option value="Mathematics">Mathematics</Option>
                        <Option value="Physics">Physics</Option>
                        <Option value="Economics">Economics</Option>
                        <Option value="Chemistry">Chemistry</Option>
                        <Option value="Biology">Biology</Option>
                        <Option value="Computing">Computing</Option>
                    </Select>

                    <div id="okButton" style={{marginTop: "3vh"}}>
                        <OkModal />
                    </div>

                </Modal>
            </div>
        );
    }
}

export default StreamsTopBar;