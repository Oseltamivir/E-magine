// Makes a list for js
import React, {Component} from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Post from './Posts_utils.js'
import {Button} from 'antd'


class Listmaker extends Component{
    constructor(prop){
        super(prop)
        this.state = {listItems: []}
    }
    
    postTime = (items) => {
        let d =  new Date()
        return items.user+' posted this at '+d.toDateString()
    }
                                   

    createItem = (items) => {return <li id = {items.key} key = {items.key}><div class = 'listpart'><p class = 'timetext' >{this.postTime(items)}</p><p>{items.text}</p></div><Button onClick = {window.onload = () =>{this.props.deleteItem(items.key)}} type = 'danger' size ='small'>Delete</Button><br/></li>}
    refreshItem = () => {const toDoEntries = this.props.entries;
        this.setState({listItems:toDoEntries.map(this.createItem)});
    }
    componentDidMount(){
    let interval = setInterval(this.refreshItem,1000) 
    }
    render(){
    
        return(
            <div id = 'listdesign'>
             <ul id =  'thelist'>{this.state.listItems}</ul>
             </div>
        )
    }
}
export default Listmaker