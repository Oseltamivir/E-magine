import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Icon, Layout, Divider, Button } from 'antd'
import Streamlist from './Streamlists'
import ReactPlayer from 'react-player'
//This will be the discussion page mainframe
const { Header, Content, Sider } = Layout;

class StreamDisc extends Component {
    constructor() {
        super()
        this.state = {
            user: 'YEET6',
            notifications: 9999, //Stores number of notifications  
            poster: 'YEET6',
            items: {},
        }
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
                            <ReactPlayer url={"https://www.twitch.tv/chess"} height="90vh" width="auto" />
                        </div>
                        <div id="desc" style={{ margin: "5px 13px" }}>
                            <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                                <span>Video Title </span>
                            </Divider>
                            <div style={{display: "flex", alignItems: "center", marginBottom: "2vh"}}>
                                <p style={{ marginTop: "2vh", color: "white", fontSize: "1.3vw", fontWeight: "bold" }}>{this.props.viewers} Viewing Now <Icon type="eye" theme="twoTone" twoToneColor="red" /></p>
                                <Button style={{ marginLeft: "2vw", backgroundColor: "#fffb8f" }}>Mathematics</Button>
                            </div>
                            <p style={{ color: "#cccccc" }}>Hello this is the description</p>
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
                    <Streamlist></Streamlist>
                    {/*Hello warren please put your very nice chat component here :D */}
                </Sider>
            </Layout>
        )
    }
}


export default StreamDisc