import React from 'react';
import { Card, message, Spin, List } from 'antd';
import './index.css';

import InfiniteScroll from 'react-infinite-scroller';

const { Meta } = Card;


class Explore extends React.Component {

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
            message.warning({ content: "Oops, we ran out of posts for now..."});
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
                <h1>Explore Page in Development!</h1>
            </div>
        );
    }
}

export default Explore;
