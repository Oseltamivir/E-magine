import React from 'react';
import { Card, message, Carousel, Avatar, Icon, Spin, List, Divider, Button } from 'antd';
import CarouselSlide from "./CauroselSlide.js";
import StreamsTopBar from "./streamsTopBar";
import './index.css';
import { NavLink } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';
import StreamsCategories from './StreamsCategories';

const { Meta } = Card;

class Streams extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            hasMore: true,
            loading: false,
            streamsPosts: [],
        };
    }


    componentDidMount() { //Fetch data once first when component loads
        this.fetchExploreData();
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

    fetchExploreData() { //Fetch user's posts
        fetch(window.baseURL + '/api/v1/explore', {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        }).then((results) => {
            return results.json(); //return data in JSON (since its JSON data)
        }).then((data) => {

            if (data.success === true) {
                const retrievedData = data.explore.streams
                const currentData = this.state.streamsPosts
                this.setState({ streamsPosts: currentData.concat(retrievedData) }) //Concat newly retrieved data
                this.setState({ loading: false, }) //Done loading, set loading state to false

                console.log(this.state.streamsPosts)
            }
        }).catch((error) => {
            message.error({ content: "Oops, posts loading connection failed" })
        })
    }

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

                    <StreamsTopBar />

                    <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                        <span>Spotlight </span>
                        <Icon type="bulb"></Icon>
                    </Divider>
                    <Carousel dotPosition="right">
                        <div>
                            <CarouselSlide username="Tkai" url="https://www.youtube.com/watch?v=OGzPmgsI-pQ" viewers={156} desc="Join me in reviewing computing... an amazing subject everyone will love, I am serious about this. Today, we will start off with insertion sort, one of the 'most efficient' sorting methods for the ordinary newcomer :D" />
                        </div>
                        <div>
                            <CarouselSlide username="William" url="https://www.youtube.com/watch?v=OGzPmgsI-pQ" viewers={156} desc="Join me in reviewing computing... an amazing subject everyone will love, I am serious about this. Today, we will start off with insertion sort, one of the 'most efficient' sorting methods for the ordinary newcomer :D" />
                        </div>
                        <div>
                            <CarouselSlide username="Warren" url="https://www.youtube.com/watch?v=OGzPmgsI-pQ" viewers={156} desc="Join me in reviewing computing... an amazing subject everyone will love, I am serious about this. Today, we will start off with insertion sort, one of the 'most efficient' sorting methods for the ordinary newcomer :D" />
                        </div>
                        <div>
                            <CarouselSlide username="Sherman" url="https://www.youtube.com/watch?v=OGzPmgsI-pQ" viewers={156} desc="Join me in reviewing computing... an amazing subject everyone will love, I am serious about this. Today, we will start off with insertion sort, one of the 'most efficient' sorting methods for the ordinary newcomer :D" />
                        </div>
                    </Carousel>
                </div>

                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Categories </span>
                    <Icon type="unordered-list"></Icon>
                </Divider>

                <div id="Category">
                    <StreamsCategories />
                </div>


                <Divider orientation="left" style={{ color: "white", fontSize: "2vw" }}>
                    <span>Hot Streams </span>
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
                        dataSource={this.state.streamsPosts}
                        locale={{
                            emptyText: (
                                <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Spin size="large" />
                                </div>
                            )
                        }}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <div key={item.id}>
                                    <NavLink to={'/StreamsDiscussion/' + item.id}>
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
                                                title={
                                                    <div id="Title" style={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
                                                        <Avatar style={{ backgroundColor: "#1890ff" }} size={45}>

                                                        </Avatar>
                                                        <Button style={{ marginLeft: "auto", backgroundColor: "#fffb8f" }}>{item.topic}</Button>
                                                    </div>
                                                }
                                                description={
                                                    <div id="Description">
                                                        <p style={{ marginTop: "2vh", color: "white", fontSize: "1.3vw", fontWeight: "bold" }}>{this.props.viewers} Viewing Now <Icon type="eye" theme="twoTone" twoToneColor="red" /></p>
                                                        <p style={{ color: "white" }}>{item.description}</p>
                                                    </div>
                                                }
                                            />
                                        </Card> {/*Pass entire datasource as prop*/}
                                    </NavLink>
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

export default Streams;
