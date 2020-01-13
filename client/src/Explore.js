import React from 'react';
import { Card, message, Spin, List } from 'antd';
import './index.css';
import InfiniteScroll from 'react-infinite-scroller';
import DiscApp from './DiscApp'
import { Link, Switch, Route, Redirect } from 'react-router-dom';
const { Meta } = Card;



class Explore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            hasMore: true,
            loading: false,
            container:{color: 'red', fontSize:'244%'}
            }
        };

    
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
                <div>
            <Link to='/DiscApp'>
            <h1 style = {this.state.container}>Hello(LINK TO DISCUSSION PAGE FOR DEBUGGING PURPOSES)</h1>
            </Link> 
            <Link to ={{ pathname: '/Topicpage',
                        state:{topicName:'Computing'}
                }}>
            <h1 style = {this.state.container}>Computing</h1>
            </Link>
            <h1 style = {this.state.container}>Maths</h1>
            <h1 style = {this.state.container}>Chemistry</h1>
            <h1 style = {this.state.container}>Physics</h1>
            <h1 style = {this.state.container}>General Paper</h1>
            <h1 style = {this.state.container}>Biology</h1>
            <h1 style = {this.state.container}>Geography</h1>
            <h1 style = {this.state.container}>History</h1>
            <h1 style = {this.state.container}>CLB</h1>
            <h1 style = {this.state.container}>CSC</h1>
        </div>  
            </div>
            
        );
    }
}

export default Explore;



