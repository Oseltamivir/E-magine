import React from 'react';
import './App.css';
import './index.css';
import Feed from './Feed';
import Explore from './Explore';
import Streams from './Streams';
import Profile from './Profile';
import { Menu, Icon, Layout, Input, Button, Avatar } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';

const { Header, Content, Sider } = Layout;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "",
      collapsed: false,
      msgcollapsed: true,
    };
  }

  handleClick = (e) => {
    console.log('click ', e);

    this.setState({
      current: e.key,
    });
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  toggle = () => {
    // Collapse navbar when opening message bar
    if (this.state.msgcollapsed === true) {
      this.setState({
        msgcollapsed: !this.state.msgcollapsed,
        collapsed: true
      });
    }

    // Uncollapse navbar when closing message bar
    else if (this.state.msgcollapsed === false) {
      this.setState({
        msgcollapsed: !this.state.msgcollapsed,
        collapsed: false
      });
    }

  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>

        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} width={200} style={{ boxShadow: "3px 0px 10px" }}>
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['Feed']}
            //defaultOpenKeys={['']}
            mode="inline"
            theme="dark"

          > {/*
        defaultSelectedKeys - default selected menu items
        defaultOpenKeys - default opened sub menus
        inline - Sidebar Menu
        */}

            <Menu.Item key="Feed" style={{ fontSize: "130%", height: "10vh", display: "flex", alignItems: "center" }}>
              <Link to="/">
                <Icon type="home" theme="twoTone" />
                <span>Home</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="Explore" style={{ fontSize: "130%", height: "10vh", display: "flex", alignItems: "center" }}>
              <Link to="/Explore">
                <Icon type="appstore" theme="twoTone" />
                <span>Explore</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="Streams" style={{ fontSize: "130%", height: "10vh", display: "flex", alignItems: "center" }}>
              <Link to="/Streams">
                <Icon type="play-square" theme="twoTone" />
                <span>Streams</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="Profile" style={{ fontSize: "130%", height: "10vh", display: "flex", alignItems: "center" }}>
              <Link to="/Profile">
                <Icon type="contacts" theme="twoTone" />
                <span>Profile</span>
              </Link>
            </Menu.Item>

          </Menu>

        </Sider>

        <Layout style={{ background: "#002140" }}>
          <Header style={{ background: '#001529', fontSize: "3vw", color: "#e6f7ff" }}>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

              <div style={{ align: "center" }}>
                <Icon type="book" theme="twoTone" />
                HomeworkOverflow
              </div>
              <Button type="primary" onClick={this.toggle} shape="circle" icon="message" size="large" style={{ marginLeft: "auto" }} />
            </div>
          </Header>

          <br></br>

          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route exact path='/' component={Feed} />
              <Route exact path='/Explore' component={Explore} />
              <Route exact path='/Streams' component={Streams} />
              <Route exact path='/Profile' component={Profile} />
            </Switch>
          </Content>

        </Layout>

        <Sider collapsible trigger={null} collapsedWidth={0} collapsed={this.state.msgcollapsed} onCollapse={this.onCollapse} width={400} style={{ boxShadow: "-3px 0px 10px" }}>
          <Messages></Messages>
        </Sider>

      </Layout>

    );

  }


}

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "",
    };
  }

  render() {
    return (
      <Layout>
        <Header style={{ fontSize: "2.5vw", color: "white" }}>
          Messages
          </Header>
      </Layout>
    );
  }
}

export default App;
