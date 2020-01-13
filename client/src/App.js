import React from 'react';
import './App.css';
import './index.css';
import Feed from './Feed';
import Explore from './Explore';
import Streams from './Streams';
import Profile from './Profile';
import DiscApp from './DiscApp.js';
import Topicpage from './Topicpage';
import { Menu, Icon, Layout, Button, Badge, Dropdown, List, Avatar } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const data = [
  {
    title: 'Hello, this is a very easy question which can be solved within 30 seconds. Do solve it nowwwww!!!',
  },
  {
    title: 'Notficiation 2',
  },
  {
    title: 'Notficiation 3',
  },
  {
    title: 'Notficiation 4',
  },
];

const notification = (
  <List
    itemLayout="vertical"
    dataSource={data}
    header={
      <h1 style={{ color: "#cccccc" }}>Notifications</h1>
    }
    style={{ backgroundColor: "#001529", boxShadow: "3px 3px 10px", borderRadius: "10px", paddingRight: "3vw", paddingLeft: "1vw" }}
    renderItem={item => (
      <List.Item style={{ color: "white", borderStyle: "solid" ,borderWidth: "0px 0px 1px 0px", borderColor: "white"}}>
        <List.Item.Meta
          avatar={
            <Avatar style={{ verticalAlign: 'middle', backgroundColor: "#1890ff" }} size="large">
              Tkai
            </Avatar>
          } //Notification type
          title={
            <h3 style={{color: "#cccccc"}}>New post from Tkai</h3>
          }
          description={
              <p style={{color: "#949494"}}>{item.title}</p>
          }
        />
      </List.Item>
    )}
  />

);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "Feed",
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
            selectedKeys={[this.state.current]}
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
          <Header style={{ background: '#001529', fontSize: "3vw", color: "#e6f7ff", boxShadow: "0px 3px 10px #0a0a0a" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

              <div style={{ align: "center" }}>
                <Icon type="book" theme="twoTone" />
                HomeworkOverflow
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <Badge count={5} offset={[-1, 1]}>
                  <Dropdown overlay={notification} trigger={['click']} placement="bottomLeft">
                    <Button type="primary" shape="circle" icon="bell" size="large" />
                  </Dropdown>
                </Badge>
                <Button type="primary" onClick={this.toggle} shape="circle" icon="message" size="large" style={{ marginLeft: "1.5vw" }} />
              </div>
            </div>
          </Header>

          <br></br>

          <Content style={{ margin: '0px 16px' }}>
            <Switch>
              <Route exact path='/' component={Feed} />
              <Route exact path='/Explore' component={Explore} />
              <Route exact path='/Streams' component={Streams} />
              <Route exact path='/Profile' component={Profile} />
              <Route exact path= '/DiscApp' component={DiscApp}/>
              <Route exact path = '/Topicpage' component = {Topicpage}/>
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
        <Header style={{ fontSize: "2.5vw", color: "#cccccc" }}>
          Messages
          </Header>
      </Layout>
    );
  }
}

export default App;
