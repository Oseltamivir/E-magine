import React, {Component} from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import logo from './logo.svg';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {Button, Badge} from 'antd'
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href='https://.google.com.sg'>1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://.google.com.sg/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

 export default class Notes extends Component{
    render(){
        return(
            <Dropdown overlay={menu} trigger={['click']}>
                <Button  type= 'primary'size = 'small'>
        Notifications  <Badge count = {this.props.notifications} overflowCount = {9999}></Badge>
                </Button>  
  </Dropdown>
        )
    }

 }
  
 