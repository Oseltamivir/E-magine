import React from 'react';
import { Card, message, Carousel, Row, Col, Avatar, Icon } from 'antd';
import ReactPlayer from 'react-player'
import './index.css';

import InfiniteScroll from 'react-infinite-scroller';

const { Meta } = Card;


class Streams extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            hasMore: true,
            loading: false,
            playing: [true, false, false, false],
            volumes: [1, 0, 0, 0]
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
            <div id="feedContainer" style={{
                overflow: "auto",
                height: "85vh",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}>
                <div id="showcase" style={{ marginLeft: "1.3vw" }}>
                    <Carousel dotPosition="right">
                        <div>
                            <CarouselSlide username="Tkai" url="https://www.youtube.com/watch?v=dATuq8O3920" viewers={156} desc="Join me in reviewing computing... an amazing subject everyone will love, I am serious about this. Totally not trying to extend the break jfjwefijnsdvkjgwdjneaghegherhjeghueguheguiauhaegeajgegjhiiiiiiiiljllllllllllllllllllllllllllllllllllifsafcasa38374732893129372173721382173394judfchiawebgvuqhwevyguhgvurhufgwqerugvhwqughuqhguqeghhwq3rgiyow3yuhgwuh" />
                        </div>
                        <div>
                            <CarouselSlide username="William" url="https://www.youtube.com/watch?v=dATuq8O3920" viewers={156} desc="Join me in reviewing computing... an amazing subject everyone will love, I am serious about this. Totally not trying to extend the break jfjwefijnsdvkjgwdjneaghegherhjeghueguheguiauhaegeajgegjhiiiiiiiiljllllllllllllllllllllllllllllllllllifsafcasa38374732893129372173721382173394judfchiawebgvuqhwevyguhgvurhufgwqerugvhwqughuqhguqeghhwq3rgiyow3yuhgwuh" />
                        </div>
                        <div>
                            <CarouselSlide username="Warren" url="https://www.youtube.com/watch?v=dATuq8O3920" viewers={156} desc="Join me in reviewing computing... an amazing subject everyone will love, I am serious about this. Totally not trying to extend the break jfjwefijnsdvkjgwdjneaghegherhjeghueguheguiauhaegeajgegjhiiiiiiiiljllllllllllllllllllllllllllllllllllifsafcasa38374732893129372173721382173394judfchiawebgvuqhwevyguhgvurhufgwqerugvhwqughuqhguqeghhwq3rgiyow3yuhgwuh" />
                        </div>
                        <div>
                            <CarouselSlide username="Sherman" url="https://www.youtube.com/watch?v=dATuq8O3920" viewers={156} desc="Join me in reviewing computing... an amazing subject everyone will love, I am serious about this. Totally not trying to extend the break jfjwefijnsdvkjgwdjneaghegherhjeghueguheguiauhaegeajgegjhiiiiiiiiljllllllllllllllllllllllllllllllllllifsafcasa38374732893129372173721382173394judfchiawebgvuqhwevyguhgvurhufgwqerugvhwqughuqhguqeghhwq3rgiyow3yuhgwuh" />
                        </div>
                    </Carousel>
                </div>

                
            </div>
        );
    }
}


class CarouselSlide extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Row type="flex" justify="center" style={{ height: "50vh"}}>
                <Col span={12} style={{ backgroundColor: "#001529", boxShadow: "0px 3px 10px #0a0a0a" }}><ReactPlayer url={this.props.url} width="40vw" height="50vh" /></Col>
                <Col span={6} style={{ backgroundColor: "#001529", height: "50vh", boxShadow: "0px 3px 10px #0a0a0a" }}>
                    <div style={{ marginLeft: "1vw", marginTop: "2vh", marginRight: "1vw" }}>
                        <Avatar style={{ backgroundColor: "#1890ff", display: "inline-block" }} size={50}>
                            {this.props.username}
                        </Avatar>
                        <h1 style={{ display: "inline-block", marginLeft: "1vw", color: "white", fontSize: "2vw" }}>{this.props.username}</h1>
                        <p style={{ marginTop: "2vh", color: "white", fontSize: "1.3vw", fontWeight: "bold" }}>{this.props.viewers} Viewers <Icon type="eye" theme="twoTone" twoToneColor="red" /></p>
                        <p style={{ color: "white", wordWrap: "break-word", overflow: "hidden", height: "28vh" }}>{this.props.desc}</p>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default Streams;
