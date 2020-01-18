import React from 'react';
import { Card, message, Avatar, Divider, Button, Icon, List, Spin, Tabs } from 'antd';
import { NavHashLink as NavLinkHash } from 'react-router-hash-link';
import './index.css';

import InfiniteScroll from 'react-infinite-scroller';

const { Meta } = Card;
const { TabPane } = Tabs;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1597763_p5whc4dho8h.js"
});

const IconMatcher = {"Mathematics":"area-chart", "Chemistry": "experiment", "Computing": "database"}

class Profile extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            profileData: null,
            data: [],
            token: this.props.token,
            hasMore: true,
            loading: false,
            yourPostsData: [],
            visitor: false, //Switch between visitor and own profile view
        };
    }

    componentWillMount() { //Fetch data once first when component loads
        this.fetchPostsData();
        this.fetchProfileData();
    }

    cardClick() {
        alert("Live chat in development...")
    }

    fetchPostsData() { //Fetch user's posts
        fetch("https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo") //Fetch data from webpage
            .then((results) => {
                return results.json(); //return data in JSON (since its JSON data)
            }).then((data) => {
                const retrievedData = data.results
                const currentData = this.state.data
                this.setState({ data: currentData.concat(retrievedData) }) //Concat newly retrieved data
                this.setState({ loading: false, }) //Done loading, set loading state to false

                if (this.state.yourPostsData.length === 0) {
                    this.setState({ yourPostsData: retrievedData })
                }
            })
    }

    fetchProfileData() { //Fetch profile info
        fetch('http://test.exegesisapp.tech:8080/api/v1/users/me', {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.state.token },
        }).then((results) => {
            return results.json(); //return data in JSON (since its JSON data)
        }).then((data) => {
            this.setState({ errorFetch: false })

            if (data.success == true) {
                this.setState({ profileData: data.profile })

            }
            else {
                alert("Failed")
            }

        }).catch((error) => {
            alert("Failed")
        })
    }



    handleInfiniteOnLoad = () => {

        this.setState({
            loading: true,
        });

        if (this.state.data.length > 50) { //Limit number of posts displayed
            message.warning({ content: "Oops, we ran out of posts for now..." });
            this.setState({
                hasMore: false,
                loading: false,
            });

        }
        else {
            this.fetchPostsData();
        }

    };

    logoutHandler = (e) => {
        localStorage.clear();
        window.location.replace("/");
    };




    render() {

        return (
            <div>
                {this.state.profileData && (
                    <div id="feedContainer" className="feedContainer" style={{
                        overflow: "auto",
                        height: "85vh",
                        width: "82vw",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        overflowX: "hidden",
                    }}>
                        <div id="TopBox" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <div id="AvatarHolder" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "20vw", height: "90vh" }}>
                                <Avatar style={{ fontSize: "5vw", backgroundColor: "#1890ff" }} size={200}>
                                </Avatar>

                                <div id="InfoHolder" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "5vw", color: "#cccccc" }}>{this.state.profileData.displayName}</h1>
                                    <h1 style={{ color: "#cccccc", marginTop: "-5vh" }}>#{this.state.profileData.id}</h1>
                                </div>
                            </div>

                            <div id="ButtonsInfo" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column", marginLeft: "4vw", width: "53vw", height: "90vh" }}>

                                {/*Visitor view*/}
                                {this.state.visitor === true && (
                                    <div id="Buttons" style={{ display: "flex", flexDirection: "row", marginBottom: "3vh" }}>
                                        <Button type="primary" onClick={this.toggle} icon="plus" size="large" style={{ marginRight: "0.7vw" }}>
                                            Follow
                                </Button>
                                        <Button type="primary" onClick={this.toggle} icon="message" size="large" style={{ marginRight: "0.7vw" }}>
                                            Message
                                </Button>
                                        <Button type="danger" onClick={this.toggle} icon="exclamation" size="large">
                                            Report
                                </Button>
                                    </div>
                                )}

                                {/*Own Profile View*/}
                                {this.state.visitor === false && (
                                    <div id="Buttons" style={{ marginBottom: "3vh" }}>
                                        <Button type="primary" onClick={this.toggle} icon="setting" size="large" style={{ marginRight: "0.7vw" }}>
                                            Edit Profile
                                </Button>
                                        <Button type="danger" onClick={this.logoutHandler} icon="logout" size="large">
                                            Log Out
                                </Button>
                                    </div>
                                )}

                                <div id="Followers" style={{ display: "flex" }}>
                                    <p class="followersstyle" style={{ color: "#cccccc" }}><span style={{ color: "white" }}>{this.state.profileData.followerCount}</span> Followers</p>
                                    <p class="followersstyle" style={{ color: "#cccccc" }}><span style={{ color: "white" }}>{this.state.profileData.karma}</span> Karma</p>
                                    <p class="followersstyle" style={{ color: "#cccccc" }}><span style={{ color: "white" }}>{this.state.profileData.postCount}</span> Questions</p>
                                    <p class="followersstyle" style={{ color: "#cccccc" }}><span style={{ color: "white" }}>{this.state.profileData.solutions}</span> Accepted Solutions</p>
                                </div>

                                <div id="Description" style={{ color: "#cccccc", fontSize: "1.3vw" }}>
                                    <text>{this.state.profileData.description}</text>
                                </div>

                                <div id="InfoHolder" style={{ display: "flex", justifyContent: "space-around", width: "53vw", marginTop: "5vh" }}>

                                    <div>
                                        <Card
                                            type="inner"
                                            bordered={false}
                                            title={<p style={{ color: "white", fontSize: "1.4vw", textAlign: "center" }}><Icon type="idcard" theme="twoTone" twoToneColor="#0050b3" /> Credentials & Info</p>}
                                            headStyle={{ backgroundColor: "#1890ff", width: "20vw" }}
                                            bodyStyle={{ backgroundColor: "#001529", width: "20vw", height: "30vh" }}
                                            style={{ boxShadow: "8px 0px 12px", width: "20vw" }}
                                        >
                                            <Meta
                                                description={<div id="Credentials" style={{ fontSize: "1.3vw" }}>
                                                    <p style={{ color: "#cccccc" }}><IconFont type="iconlocation" /> {this.state.profileData.credentials.location}</p>
                                                    <p style={{ color: "#cccccc" }}><IconFont type="iconstudy" /> {this.state.profileData.credentials.school}</p>
                                                    <p style={{ color: "#cccccc" }}><IconFont type="iconwork" /> {this.state.profileData.credentials.occupation}</p>
                                                    <p style={{ color: "#cccccc" }}><Icon type="bank" /> {this.state.profileData.credentials.workplace}</p>

                                                </div>}
                                            />
                                        </Card>
                                    </div>

                                    <div>

                                        <Card
                                            type="inner"
                                            bordered={false}
                                            title={<p style={{ color: "white", fontSize: "1.4vw", textAlign: "center" }}><Icon type="crown" theme="twoTone" twoToneColor="#d4b106" /> Knowledge Areas</p>}
                                            headStyle={{ backgroundColor: "#1890ff", width: "20vw" }}
                                            bodyStyle={{ backgroundColor: "#001529", width: "20vw", height: "30vh" }}
                                            style={{ boxShadow: "8px 0px 12px", width: "20vw" }}
                                        >
                                            <Meta
                                                description={
                                                    <div id="KnowledgeAreas" style={{ fontSize: "1.3vw" }}>
                                                        <List
                                                            itemLayout="horizontal"
                                                            dataSource={this.state.profileData.areas}
                                                            split={false}
                                                            renderItem={item => (
                                                                <List.Item>
                                                                    <p style={{ marginBottom: "-1.5vh", fontSize: "1.3vw", color: "#cccccc" }}><Icon type={IconMatcher[item]} /> {item}</p>
                                                                </List.Item>
                                                            )}
                                                        />
                                                    </div>
                                                }
                                            />
                                        </Card>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <Tabs defaultActiveKey="1" size="large" tabBarStyle={{ color: "white", backgroundColor: "#001529", boxShadow: "3px 3px 10px #0a0a0a" }}>
                            <TabPane tab={
                                <span>
                                    <Icon type="question-circle" theme="twoTone" />
                                    Questions
                        </span>
                            }
                                key="1">
                                <div>

                                    <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                                        <span>Questions Posted </span>
                                        <Icon type="question-circle"></Icon>
                                    </Divider>
                                    <InfiniteScroll
                                        initialLoad={false}
                                        pageStart={0}
                                        loadMore={this.handleInfiniteOnLoad.bind(this)} //Function to handle infinite load
                                        hasMore={!this.state.loading && this.state.hasMore} //If [Not Loading] && [Has More Content], then true
                                        useWindow={false}
                                        getScrollParent={() => document.getElementById('feedContainer')}
                                    >
                                        <List
                                            grid={{ gutter: 20, column: 2 }}
                                            dataSource={this.state.data}
                                            locale={{
                                                emptyText: (
                                                    <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                        <Spin size="large" />
                                                    </div>
                                                )
                                            }}
                                            renderItem={item => (
                                                <List.Item key={item.id}>
                                                    <div onClick={this.cardClick} key={item.id}>
                                                        <Card
                                                            hoverable
                                                            type="inner"
                                                            bordered={false}
                                                            title="Mathematics - Differential Equations"
                                                            headStyle={{ backgroundColor: "#1890ff", color: "white" }}
                                                            bodyStyle={{ backgroundColor: "#001529" }}
                                                            style={{ boxShadow: "8px 0px 12px" }}
                                                            cover={<img alt="example" src={require('./assets/questionexample.jpeg')} />}
                                                        >
                                                            <Meta
                                                                title={<p style={{ color: "white" }}>First Name: {item.name.first}</p>}
                                                                description={<p style={{ color: "white" }}>Title: {item.name.title}</p>}
                                                            />
                                                        </Card>
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                        {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <Spin size="large" />
                                            </div>
                                        )}
                                    </InfiniteScroll>
                                </div>
                            </TabPane>
                            <TabPane tab={
                                <span>
                                    <Icon type="check-circle" theme="twoTone" />
                                    Solutions
                        </span>
                            }
                                key="2"
                            >
                                <div>

                                    <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                                        <span>Solutions </span>
                                        <Icon type="check-circle"></Icon>
                                    </Divider>
                                    <InfiniteScroll
                                        initialLoad={false}
                                        pageStart={0}
                                        loadMore={this.handleInfiniteOnLoad.bind(this)} //Function to handle infinite load
                                        hasMore={!this.state.loading && this.state.hasMore} //If [Not Loading] && [Has More Content], then true
                                        useWindow={false}
                                        getScrollParent={() => document.getElementById('feedContainer')}
                                    >
                                        <List
                                            grid={{ gutter: 20, column: 2 }}
                                            dataSource={this.state.data}
                                            locale={{
                                                emptyText: (
                                                    <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                        <Spin size="large" />
                                                    </div>
                                                )
                                            }}
                                            renderItem={item => (
                                                <List.Item key={item.id}>
                                                    <div onClick={this.cardClick} key={item.id}>
                                                        <Card
                                                            hoverable
                                                            type="inner"
                                                            bordered={false}
                                                            title="Mathematics - Differential Equations"
                                                            headStyle={{ backgroundColor: "#1890ff", color: "white" }}
                                                            bodyStyle={{ backgroundColor: "#001529" }}
                                                            style={{ boxShadow: "8px 0px 12px" }}
                                                            cover={<img alt="example" src={require('.//assets/questionexample.jpeg')} />}
                                                        >
                                                            <Meta
                                                                title={<p style={{ color: "white" }}>First Name: {item.name.first}</p>}
                                                                description={<p style={{ color: "white" }}>Title: {item.name.title}</p>}
                                                            />
                                                        </Card>
                                                    </div>
                                                </List.Item>
                                            )}
                                        />

                                        {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <Spin size="large" />
                                            </div>
                                        )}
                                    </InfiniteScroll>
                                </div>
                            </TabPane>
                        </Tabs>

                    </div>
                )}

                {!this.state.profileData && (
                    <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Spin size="large" />
                    </div>
                )}
            </div >
        );
    }
}



export default Profile;
