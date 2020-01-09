import React from 'react';
import { Card, message, Spin, List } from 'antd';
import './index.css';
import DiscApp from './DiscApp'
import InfiniteScroll from 'react-infinite-scroller';
import { Link, Switch, Route } from 'react-router-dom';
const { Meta } = Card;


class Topics extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <div>
            <Link to='/DiscApp'>
            <h1>Hello</h1>
            </Link> 
          </div>  
        )
    }
}
export default Topics