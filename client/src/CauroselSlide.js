import React from 'react';
import {Row, Col, Avatar, Icon} from 'antd';
import ReactPlayer from 'react-player'

class CarouselSlide extends React.Component {

    render() {
        return (
            <Row type="flex" justify="center" style={{ height: "55vh", width: "80vw" }}>
                <Col span={12} style={{ backgroundColor: "#001529", boxShadow: "0px 3px 10px #0a0a0a" }}><ReactPlayer url={this.props.url} width="40vw" height="55vh" /></Col>
                <Col span={6} style={{ backgroundColor: "#001529", height: "55vh", boxShadow: "0px 3px 10px #0a0a0a" }}>
                    <div style={{ marginLeft: "1vw", marginTop: "2vh", marginRight: "1vw" }}>
                        <Avatar style={{ backgroundColor: "#1890ff", display: "inline-block" }} size={50}>
                            {this.props.username}
                        </Avatar>
                        <h1 style={{ display: "inline-block", marginLeft: "1vw", color: "white", fontSize: "2vw" }}>{this.props.username}</h1>
                        <p style={{ marginTop: "2vh", color: "white", fontSize: "1.3vw", fontWeight: "bold" }}>{this.props.viewers} Viewing Now <Icon type="eye" theme="twoTone" twoToneColor="red" /></p>
                        <p style={{ color: "white", wordWrap: "break-word", overflow: "hidden", height: "28vh" }}>{this.props.desc}</p>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default CarouselSlide;