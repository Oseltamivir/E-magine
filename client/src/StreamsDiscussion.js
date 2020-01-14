import React, { Component } from 'react';
import logo from './logo.svg';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Post from './Posts_utils.js'
import Todo from './to-do-list.js'
import { Button, Badge } from 'antd'
import Notes from './notifications.js'
//This will be the discussion page mainframe
class StreamDisc extends Component {
    constructor() {
        super()
        this.state = {
            user: 'YEET6',
            category: 'Math', // For storing category
            notifications: 9999, //Stores number of notifications  
            poster: 'YEET6',
            items: {},
        }

    }
    render() {
        return (
            <div id='All'>
                <div id='header'>
                    <h1 id='Category'>{this.state.category}
                    </h1>
                    <br />
                </div>{/*Div for id 'Header */}
                <div id="showcase" style={{ marginLeft: "1.3vw", marginBottom: "10vh" }}>
                    <Carousel dotPosition="right">
                        <div>
                            <CarouselSlide username="ThatHentaiUser" url="https://www.youtube.com/watch?v=VF3M6l9rsqs" viewers={156} desc="Waa! Waa! Jugemu Jugemu Go-Kō-no-Surikire Kaijari-suigyo no Suigyō-matsu Unrai-matsu Fūrai-matsu Kū-Neru Tokoro ni Sumu Tokoro Yaburakōji no Burakōji Paipo Paipo Paipo no Shūringan Shūringan no Gūrindai Gūrindai no Ponpokopii no Ponpokonā no Chōkyūmei no Chōsuke hit me and gave me a lump on my head What? Our Jugemu Jugemu Go-Kō-no-Surikire Kaijari-suigyo no Suigyō-matsu Unrai-matsu Fūrai-matsu Kū-Neru Tokoro ni Sumu Tokoro Yaburakōji no Burakōji Paipo Paipo Paipo no Shūringan Shūringan no Gūrindai Gūrindai no Ponpokopii no Ponpokonā no Chōkyūmei no Chōsuke hit you and gave you a lump on your head? I'm so sorry! Honey, did you hear that? It seems that Jugemu Jugemu Go-Kō-no-Surikire Kaijari-suigyo no Suigyō-matsu Unrai-matsu Fūrai-matsu Kū-Neru Tokoro ni Sumu Tokoro Yaburakōji no Burakōji Paipo Paipo Paipo no Shūringan Shūringan no Gūrindai Gūrindai no Ponpokopii no Ponpokonā no Chōkyūmei no Chōsuke hit Kin-chan here, and gave him a lump on his head!
Really? Our Jugemu Jugemu Go-Kō-no-Surikire Kaijari-suigyo no Suigyō-matsu Unrai-matsu Fūrai-matsu Kū-Neru Tokoro ni Sumu Tokoro Yaburakōji no Burakōji Paipo Paipo Paipo no Shūringan Shūringan no Gūrindai Gūrindai no Ponpokopii no Ponpokonā no Chōkyūmei no Chōsuke did that? We'd better call Jugemu Jugemu Go-Kō-no-Surikire Kaijari-suigyo no Suigyō-matsu Unrai-matsu Fūrai-matsu Kū-Neru Tokoro ni Sumu Tokoro Yaburakōji no Burakōji Paipo Paipo Paipo no Shūringan Shūringan no Gūrindai Gūrindai no Ponpokopii no Ponpokonā no Chōkyūmei no Chōsuke in here and sort this out. Can I see your lump, Kin-chan?
It took so long to explain, the lump's already gone down!"/>
                        </div>
                    </Carousel>
                </div>
                <br />
                {/*div for 'all*/}
            </div>
        )
    }
}


export default StreamDisc