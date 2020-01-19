import React from 'react';
import { Card, message, Avatar, Icon, Spin, List, Divider, Button } from 'antd';
import ExploreTopBar from "./ExploreTopBar";
import './index.css';
import InfiniteScroll from 'react-infinite-scroller';
import ExploreCategories from './ExploreCategories';

const { Meta } = Card;




export default class Explore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            hasMore: true,
            loading: false,
            explorePostsData: [],
        };
    }

    cardClick() {
        alert("Live chat in development...")
    }

    componentDidMount() { //Fetch data once first when component loads
        this.fetchExploreData();
    }

    fetchExploreData() { //Fetch user's posts
        fetch(window.baseURL + '/api/v1/explore', {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        }).then((results) => {
            return results.json(); //return data in JSON (since its JSON data)
        }).then((data) => {

            if (data.success === true) {
                const retrievedData = data.explore.questions
                const currentData = this.state.explorePostsData
                this.setState({ explorePostsData: currentData.concat(retrievedData) }) //Concat newly retrieved data
                this.setState({ loading: false, }) //Done loading, set loading state to false

                console.log(data.explore.questions)
            }
        }).catch((error) => {
            message.error({ content: "Oops, posts loading connection failed" })
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
            this.fetchExploreData();
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
                        dataSource={this.state.explorePostsData}
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
                                        title={item.title}
                                        headStyle={{ backgroundColor: "#1890ff", color: "white", }}
                                        bodyStyle={{ backgroundColor: "#001529" }}
                                        style={{ boxShadow: "8px 0px 12px" }}

                                    >
                                        <Meta
                                            title={<div><Button style={{ marginLeft: "auto", backgroundColor: "#fffb8f" }}>{item.topic}</Button></div>}
                                            description={<div dangerouslySetInnerHTML={{ __html: item.description }} style={{ color: "#cccccc" }}></div>}
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


