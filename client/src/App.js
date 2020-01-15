import React from 'react';
import './App.css';
import './index.css';
import Feed from './Feed';
import Explore from './Explore';
import Streams from './Streams';
import Profile from './Profile';
import DiscApp from './DiscApp.js';
import Topicpage from './Topicpage';
import streamsTopicPage from './streamsTopicPage';
import StreamDisc from './StreamsDiscussion'
import { ReactComponent as Logo } from './logo.svg';

import { Divider, Menu, Icon, Layout, Button, Badge, Dropdown, List, Avatar, Card } from 'antd';
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';
const { Meta } = Card
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
      <List.Item style={{ color: "white", borderStyle: "solid", borderWidth: "0px 0px 1px 0px", borderColor: "white" }}>
        <List.Item.Meta
          avatar={
            <Avatar style={{ verticalAlign: 'middle', backgroundColor: "#1890ff" }} size="large">
              Tkai
            </Avatar>
          } //Notification type
          title={
            <h3 style={{ color: "#cccccc" }}>New post from Tkai</h3>
          }
          description={
            <p style={{ color: "#949494" }}>{item.title}</p>
          }
        />
      </List.Item>
    )}
  />

);


var previousLocation = "";

class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      current: "Feed",
      collapsed: false,
      msgcollapsed: true,
    };
  }

  componentDidUpdate() {
    const path = this.props.location.pathname;
    const page = path.split("/")[1];

    if (page !== previousLocation) {
      previousLocation = page;

      if (page === "") {
        this.setState({
          current: "Feed"
        })
      }
      else {
        this.setState({
          current: page
        })
      }
    }
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    const page = path.split("/")[1];

    previousLocation = page;
    if (page === "") {
      this.setState({
        current: "Feed"
      })
    }
    else {
      this.setState({
        current: page
      })
    }
  }

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

        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} width="15vw" style={{ boxShadow: "3px 0px 10px" }}>
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

            <Menu.Item key="Feed" style={{ fontSize: "1.4vw", height: "10vh", display: "flex", alignItems: "center" }}>
              <NavLink to="/">
                <Icon type="home" theme="twoTone" twoToneColor="#0050b3" />
                <span>Home</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="Explore" style={{ fontSize: "1.4vw", height: "10vh", display: "flex", alignItems: "center" }}>
              <NavLink to="/Explore">
                <Icon type="appstore" theme="twoTone" twoToneColor="#0050b3" />
                <span>Explore</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="Streams" style={{ fontSize: "1.4vw", height: "10vh", display: "flex", alignItems: "center" }}>
              <NavLink to="/Streams">
                <Icon type="play-square" theme="twoTone" twoToneColor="#0050b3" />
                <span>Streams</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="Profile" style={{ fontSize: "1.4vw", height: "10vh", display: "flex", alignItems: "center" }}>
              <NavLink to="/Profile">
                <Icon type="contacts" theme="twoTone" twoToneColor="#0050b3" />
                <span>Profile</span>
              </NavLink>
            </Menu.Item>

          </Menu>

        </Sider>

        <Layout style={{ background: "#002140" }}>
          <Header style={{ background: '#001529', fontSize: "3vw", color: "#e6f7ff", boxShadow: "0px 3px 10px #0a0a0a" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

              <div style={{ align: "center" }}>
                <Icon component={Logo} />
                <span style={{ fontWeight: "500" }}> Exegesis</span>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <Badge count={5} offset={[-1, 1]}>
                  <Dropdown overlay={notification} trigger={['click']} placement="bottomLeft">
                    <Button type="primary" shape="circle" icon="bell" size="large" />
                  </Dropdown>
                </Badge>
                <Badge count={5} offset={[-1, 1]}>
                  <Button type="primary" onClick={this.toggle} shape="circle" icon="message" size="large" style={{ marginLeft: "1.5vw" }} />
                </Badge>
              </div>
            </div>
          </Header>

          <br></br>

          <Content style={{ margin: '0px 16px', width: "82vw" }}>
            <Switch>
              <Route exact path='/' component={Feed} />
              <Route exact path='/Explore' component={Explore} />
              <Route exact path='/Streams' component={Streams} />
              <Route exact path='/Streams/' component={Profile} />
              <Route exact path='/Streams/:topic' component={streamsTopicPage} />
              <Route exact path='/Profile' component={Profile} />
              <Route exact path='/DiscApp' component={DiscApp} />
              <Route exact path='/Topicpage' component={Topicpage} />
              <Route exact path='/StreamsDiscussion' component={StreamDisc} />
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
      recents: [
        { sender: 'Hi', text: "hello" },
        { sender: 'Jimmy', text: "hello i am great" },
        { sender: 'Twig', text: "Twig" },
        { sender: 'Pew', text: "I am an object within an object across an object between an objec" },
        { sender: 'DInk', text: "hello" },
        { sender: 'ahahahahah', text: "hello" },
        { sender: 'Jabba', text: "hello" },
        { sender: 'Palpatine', text: "hello" },
        { sender: 'Vader', text: "hello" },
        { sender: 'Chairman Mao', text: "hello" },

      ],
      currentText: '',
      user: 'Hi'
    };
  }
  render() {
    return (
      <Layout>
        <Header style={{ fontSize: "2.5vw", color: "#cccccc" }}>
          <Divider style={{ fontSize: "2.5vw", color: "#cccccc" }}>Messages</Divider>
        </Header>
        <Menu onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          //defaultOpenKeys={['']}
          mode="inline"
          theme="dark">
          <Menu.Item key="Sender_1" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <hr style={{ color: '#cccccc' }} />
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[0].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[0].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="Sender_2" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[1].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[1].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>


          <Menu.Item key="Sender_3" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[2].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[2].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>


          <Menu.Item key="Sender_4" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[3].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[3].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="Sender_5" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[4].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[4].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="Sender_6" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[5].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[5].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="Sender_7" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[6].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[6].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="Sender_8" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[7].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[7].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="Sender_9" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[8].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[8].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="Sender_10" style={{ fontSize: "130%", height: "18vh", alignItems: "center" }}>
            <NavLink to="/">
              <div>
                <h1 style={{ color: 'white', fontSize: "130%" }}><strong>{this.state.recents[9].sender}</strong></h1>
                <p><Icon type="double-right" />{this.state.recents[9].text}</p>
                <hr style={{ color: '#cccccc' }} />
              </div>
            </NavLink>
          </Menu.Item>

        </Menu>
      </Layout >
    );
  }
}

export default withRouter(App);
