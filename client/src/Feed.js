import React from 'react';
import { Card, message, Spin, List, Divider, Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.css';

import InfiniteScroll from 'react-infinite-scroller';

const { Meta } = Card;


class Feed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            yourPostsData: [],
            hasMore: true,
            loading: false,
        };
    }

    cardClick() {
        alert("Live chat in development...")
    }

    componentDidMount() { //Fetch data once first when component loads
        this.fetchData();
        this.fetchPostsData();
    }

    fetchData() {
        fetch("https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo") //Fetch data from webpage
            .then((results) => {
                return results.json(); //return data in JSON (since its JSON data)
            }).then((data) => {
                const retrievedData = data.results
                const currentData = this.state.data
                this.setState({ data: currentData.concat(retrievedData) }) //Concat newly retrieved data
                this.setState({ loading: false, }) //Done loading, set loading state to false
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
            this.fetchData();
        }

    };

    fetchPostsData() { //Fetch user's posts
        fetch(window.baseURL + '/api/v1/posts/me?limit=5&type=0', {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        }).then((results) => {
            return results.json(); //return data in JSON (since its JSON data)
        }).then((data) => {

            if (data.success === true) {
                this.setState({ yourPostsData: data.posts }) 
            }
        }).catch((error) => {
            message.error({ content: "Oops, connection failed" })
        })
    }

    render() {
        return (
            <div className="feedContainer" style={{
                overflow: "auto",
                height: "86vh",
                width: "82vw",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overflowX: "hidden",
            }}>
                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Your Questions </span>
                    <Icon type="user"></Icon>
                </Divider>
                <div id="yourPostsContainer" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                    <List
                        grid={{ gutter: 20, column: 4 }}
                        itemLayout={"vertical"}
                        dataSource={this.state.yourPostsData}
                        locale={{
                            emptyText: (
                                <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <h1 style={{ color: "white", fontSize: "2vw" }}><Icon type="folder-open" /> It seems rather empty in here...</h1>
                                </div>
                            )
                        }}
                        style={{ minWidth: "60vw"}}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <div onClick={this.cardClick} key={item.id}>
                                    <Card
                                        hoverable
                                        type="inner"
                                        bordered={false}
                                        title={item.title}
                                        headStyle={{ backgroundColor: "#1890ff", color: "white" }}
                                        bodyStyle={{ backgroundColor: "#001529", height: "20vh" }}
                                        style={{ boxShadow: "8px 0px 12px" }}
                                    >
                                        <Meta
                                            title={<div><Button style={{ marginLeft: "auto", backgroundColor: "#fffb8f" }}>Mathematics</Button></div>}
                                            description={<div dangerouslySetInnerHTML={{ __html: item.description }} style={{ color: "#cccccc" }}></div>}
                                        />
                                    </Card>
                                </div>
                            </List.Item>
                        )}
                    />
                    <NavLink to="/Profile">
                        <Button type="primary" shape="round" icon="right" size="large" style={{marginLeft: "3vw"}}>
                            Show All
                        </Button>
                    </NavLink>
                </div>
                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Recommended Questions </span>
                    <Icon type="question-circle"></Icon>
                </Divider>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad.bind(this)} //Function to handle infinite load
                    hasMore={!this.state.loading && this.state.hasMore} //If [Not Loading] && [Has More Content], then true
                    useWindow={false}
                >
                    <List
                        grid={{ gutter: 20, column: 2 }}
                        dataSource={this.state.data}
                        locale={{
                            emptyText: (
                                <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <h1 style={{ color: "white", fontSize: "2vw" }}><Icon type="folder-open" /> It seems rather empty in here...</h1>
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
                                            title={<div><p style={{ color: "white" }}>First Name: {item.name.first}</p><Button style={{ marginLeft: "auto", backgroundColor: "#fffb8f" }}>Mathematics</Button></div>}
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
        );
    }
}

export default Feed;
