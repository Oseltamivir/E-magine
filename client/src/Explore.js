import React from 'react';
import { Card, message, Carousel, Avatar, Icon, Spin, List, Divider, Button, Input } from 'antd';
import CarouselSlide from "./CauroselSlide.js";
import ExploreTopBar from "./ExploreTopBar";
import './index.css';
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';
import ExploreCategories from './ExploreCategories';

const { Meta } = Card;

const { Search } = Input;


export default class Explore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            hasMore: true,
            loading: false,
        };
    }

    cardClick() {
        alert("Live chat in development...")
    }

    componentDidMount() { //Fetch data once first when component loads
        this.fetchData();
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
                <div id="showcase" style={{ marginLeft: "1.3vw", marginBottom: "5vh" }}>
                    <ExploreTopBar />
                    
                </div>

                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Categories </span>
                    <Icon type="unordered-list"></Icon>
                </Divider>

                <div id="Category">
                    <ExploreCategories />
                </div>


                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Hot Posts </span>
                    <Icon type="fire" theme="twoTone" twoToneColor='red' />
                </Divider>

                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad.bind(this)} //Function to handle infinite load
                    hasMore={!this.state.loading && this.state.hasMore} //If [Not Loading] && [Has More Content], then true
                    useWindow={false}
                >
                    <List
                        grid={{ gutter: 30, column: 3 }}
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
                                    </Card> {/*Pass entire datasource as prop*/}
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


