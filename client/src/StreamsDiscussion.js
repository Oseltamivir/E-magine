import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Icon, Layout, Divider, Button, message } from 'antd'
import Streamlist from './Streamlists'
import ReactPlayer from 'react-player'
import './streamchat.css'
//This will be the discussion page mainframe
const { Content, Sider } = Layout;

class StreamDisc extends Component {
    constructor() {
        super()
        this.state = {
            user: 'YEET6',
            notifications: 9999, //Stores number of notifications  
            poster: 'YEET6',
            items: {},
            channel_id: "",
            data: [],
        }
    }

    componentDidMount() {
        this.setState(
            {channel_id: this.props.match.params.channel_id},
            this.fetchChannelInfo.bind(this)
            )
    }

    fetchChannelInfo() {
        fetch(window.baseURL + '/api/v1/channels/' + this.state.channel_id, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        }).then((results) => {
            return results.json(); //return data in JSON (since its JSON data)
        }).then((data) => {

            if (data.success === true) {
                this.setState({ data: data.channel })
                message.success({ content: "Loaded." });
                console.log(this.state.data)
            }
            else {
                message.error({ content: "Oops... unable to find post" });
            }

        }).catch((error) => {
            message.error({ content: "Oops, connection error" });
            message.error({ content: error });
        })
    }

    render() {
        return (
            <Layout style={{
                height: "90vh",
                width: "85vw",
                marginTop: "-18px",
                marginLeft: "-16px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overflow: "auto",
                overflowX: "none",
            }}>
                <Content>

                    <div id="videoDesc" style={{
                        overflow: "auto",
                        backgroundColor: "#001529"
                    }}>

                        <div id="video" style={{ backgroundColor: "black" }}>
                            <ReactPlayer url={this.state.data.streamURL} height="90vh" width="auto" />
                        </div>
                        <div id="desc" style={{ margin: "5px 13px" }}>
                            <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                                <span>{this.state.data.title} </span>
                            </Divider>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "2vh" }}>
                                <p style={{ marginTop: "2vh", color: "white", fontSize: "1.3vw", fontWeight: "bold" }}>{this.props.viewers} Viewing Now <Icon type="eye" theme="twoTone" twoToneColor="red" /></p>
                                <Button style={{ marginLeft: "2vw", backgroundColor: "#fffb8f" }}>{this.state.data.topic}</Button>
                            </div>
                            <p style={{ color: "#cccccc" }}>{this.state.data.description}</p>
                        </div>
                    </div>

                </Content>


                <Sider collapsible width="20vw" trigger={null} collapsedWidth={0} style={{
                    backgroundColor: "#002140",
                    overflow: "auto",
                }}>
                    <div id="ChatHeader" style={{ backgroundColor: "#001529" }}>
                        <h1 style={{ color: "white", fontSize: "2vw", textAlign: "center" }}>Stream Chat</h1>
                        <Divider></Divider>
                    </div>
                    {/*<Streamlist user={this.state.user} />*/}
                    {/*Hello warren please put your very nice chat component here :D */}
                </Sider>
            </Layout>
        )
    }
}


export default StreamDisc