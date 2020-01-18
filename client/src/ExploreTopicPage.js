import React from 'react';
import { Card, message, Spin, List, Button, Icon, Avatar } from 'antd';
import './index.css';

import InfiniteScroll from 'react-infinite-scroller';

const { Meta } = Card;

const Categories = {
    "Maths": {
        cover: (require(".//assets/maths.jpeg")),
        fullName: "Mathematics Posts"
    },
    "Physics": {
        cover: (require(".//assets/physics.jpeg")),
        fullName: "Physics Posts"
    },
    "Chemistry": {
        cover: (require(".//assets/chem.jpeg")),
        fullName: "Chemistry Posts"
    },
    "Computing": {
        cover: (require(".//assets/comp.jpeg")),
        fullName: "Computing Posts"
    },
    "Economics": {
        cover: (require(".//assets/economics.jpg")),
        fullName: "Economics Posts"
    },

};

var currentPage = "";


class ExploreTopicPage extends React.Component {

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

    componentWillMount() { //Fetch data once
        this.fetchData();
        currentPage = this.props.match.params.topic;
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

                if (this.state.yourPostsData.length === 0) {
                    this.setState({ yourPostsData: retrievedData })
                }
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

    render() {
        return (
            <div className="feedContainer" style={{
                overflow: "auto",
                height: "85vh",
                width: "82vw",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overflowX: "hidden",
            }}>
                <div id="Header" style={{ positon: "relative", width: "82vw", height: "50vh", textAlign: "center", borderStyle: "solid", borderWidth: "0px 0px 3px 0px", borderColor: "#1890ff", boxShadow: "0px 10px 10px #0a0a0a", marginBottom: "5vh" }}>
                    <img alt="Banner" style={{ width: "100%", height: "100%" }} src={Categories[currentPage].cover} />
                    <h1 style={{
                        color: "white",
                        position: "relative",
                        bottom: "60%",
                        fontSize: "3vw",
                        backgroundColor: "rgba(0, 21, 41, 0.90)",
                    }}>{Categories[currentPage].fullName} <Icon type="play-square" theme="twoTone" /></h1>
                </div>

                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad.bind(this)} //Function to handle infinite load
                    hasMore={!this.state.loading && this.state.hasMore} //If [Not Loading] && [Has More Content], then true
                    useWindow={false}
                >

                    <List
                        grid={{ gutter: 20, column: 3 }}
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
                                        title="Post Title"
                                        headStyle={{ backgroundColor: "#1890ff", color: "white", }}
                                        bodyStyle={{ backgroundColor: "#001529" }}
                                        style={{ boxShadow: "8px 0px 12px" }}
                                        cover={<img alt="example" src={require('./assets/questionexample.jpeg')} />}
                                    >
                                        <Meta
                                            title={
                                                <div id="Title" style={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
                                                    <Avatar style={{ backgroundColor: "#1890ff" }} size={45}>
                                                        Tkai
                                                    </Avatar>
                                                    <h1 style={{ marginLeft: "1vw", color: "white", fontSize: "1.5vw" }}>{item.name.first}</h1>
                                                    <Button style={{ marginLeft: "auto", backgroundColor: "#fffb8f" }}>Mathematics</Button>
                                                </div>
                                            }
                                            description={
                                                <div id="Description">
                                                    <p style={{ marginTop: "2vh", color: "white", fontSize: "1.3vw", fontWeight: "bold" }}>{this.props.viewers} Viewing Now <Icon type="eye" theme="twoTone" twoToneColor="red" /></p>
                                                    <p style={{ color: "white" }}>{item.name.title}</p>
                                                </div>
                                            }
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

export default ExploreTopicPage;
