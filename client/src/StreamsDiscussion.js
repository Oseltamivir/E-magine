import React, { Component } from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Badge, Carousel, Layout, Menu } from 'antd'
import CarouselSlide from "./CauroselSlide"
import Streamlist from './Streamlists'
//This will be the discussion page mainframe
const { Sider } = Layout;
class StreamDisc extends Component {
    constructor() {
        super()
        this.state = {
            user: 'YEET6',
            notifications: 9999, //Stores number of notifications  
            poster: 'YEET6',
            items: {},
            collapsed: false,
            msgcollapsed: true,
        }
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };
    render() {
        return (
            <div id='All'>
                <Layout>
                    <Sider>
                        Î<Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            //defaultOpenKeys={['']}
                            mode="inline"
                            theme="dark"
                        > 
                        <Streamlist collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} width="15vw" style={{ boxShadow: "3px 0px 10px" }}/>
                        </Menu>
                        
                    </Sider>
                </Layout>
                <div id='header'>
                    <h1 id='Category'>{this.state.category}
                    </h1>
                    <br />
                </div>{/*Div for id 'Header */}
                            <div id="showcase" style={{ marginLeft: "1.3vw", marginBottom: "10vh" }}>
                                <Carousel dotPosition="">
                                    <div>
                                        <CarouselSlide username="ThatCapitalistGopnik" url="https://www.youtube.com/watch?v=2SLvtP6KMUM&gl=SG" viewers={156} desc="State Anthem of the Soviet UnionAlexandrow-Ensemble Союз нерушимый республик свободных Сплотила навеки Великая Русь. Да здравствует созданный волей народов Единый, могучий Советский Союз! Славься, Отечество наше свободное, Дружбы, народов надежный оплот! Знамя советское, знамя народное Пусть от победы, к победе ведет! Сквозь грозы сияло нам солнце свободы, И Ленин великий нам путь озарил. Нас вырастил Сталин - на верность народу На труд и на подвиги нас вдохновил. Славься, Отечество чаше свободное, Счастья народов надежный оплот! Знамя советское, знамя народное Пусть от победы к победе ведет! Skvoz grozy siialo nam solntse svobody, I Lenin velikij nam put ozaril. Nas vyrastil Stalin - na vernost narodu Na trud i na podvigi nas vdokhnovil. Slavsia, Otechestvo chashe svobodnoe, Schastia narodov nadezhnyj oplot! Znamia sovetskoe, znamia narodnoe Pust ot pobedy k pobede vedet! Мы армию нашу растили в сраженьях, Захватчиков подлых с дороги сметем! Мы в битвах решаем судьбу поколений, Мы к славе Отчизну свою поведем! Славься, Отечество наше свободное, Славы народов надежный оплот! Знамя советское, знамя народное Пусть от победы к победе ведет!"
                                        />
                                    </div>
                                </Carousel>
                            </div>
                            {/*div for 'all*/}
                
            </div>
                        )
                    }
                }
                
                
export default StreamDisc