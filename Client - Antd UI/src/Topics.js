import React from 'react';
import { Card, message, Spin, List } from 'antd';
import './index.css';
import DiscApp from './DiscApp'
import InfiniteScroll from 'react-infinite-scroller';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
const { Meta } = Card;


class Topics extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            container:{color: 'red', fontSize:'244%'}
        }
    }
    render(){
        return(
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
        )
    }
}
export default Topics