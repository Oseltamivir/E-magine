import React from 'react';
import { Card, message, Spin, List } from 'antd';
import './index.css';

import InfiniteScroll from 'react-infinite-scroller';

const { Meta } = Card;

//CSS and cards will be like Kai Xiang's, where clicking on cards will link to that discussion page.
{/*Basic Functionalities 
    - A background image like Reddit which can be customised(Preferably with AntUi's Upload tag)
    -Page name
    - Information about that page
    - Moderator list at the site
    -If time persists, a top 10 post(Based on upvotes at the side of the page)
    - AntUI cards that denote a discussion page
    - An add Button to add more cards
        -This will be saved in a to-do list fashion, storing objects(the user and time created) in the list and mapping them out in card format
*/}

export default class Topicpage  extends React.Component {
    constructor(props){
        super(props)
        this.state = {pageName:'',
                    items:[],
                    currentState ={user:'',time:''}
        }
    }
}