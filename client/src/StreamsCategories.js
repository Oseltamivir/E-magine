import React from 'react';
import { Card, Avatar, Icon, Spin, List, Button } from 'antd';
import './index.css';

const {Meta} = Card;

const Categories = [
    {
      title: (<div>Mathematics <Icon type="pie-chart" theme="twoTone" /></div>),
      cover: require(".//assets/maths.jpeg")
    },
    {
      title: (<div>Physics <Icon type="rocket" theme="twoTone" /></div>),
      cover: require('.//assets/physics.jpeg')
    },
    {
      title: (<div>Chemistry <Icon type="experiment" theme="twoTone" /></div>),
      cover: require('.//assets/chem.jpeg')
    },
    {
      title: (<div>Computing <Icon type="hdd" theme="twoTone" /></div>),
      cover: require('.//assets/comp.jpeg')
    },
  ];

class StreamsCategories extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <List
                grid={{ gutter: 30, column: 4 }}
                dataSource={Categories}
                locale={{
                    emptyText: (
                        <div className="demo-loading-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Spin size="large" />
                        </div>
                    )
                }}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <div onClick={this.cardClick} key={item.id}>
                            <Card
                                hoverable
                                type="inner"
                                bordered={false}
                                bodyStyle={{ backgroundColor: "#001529" }}
                                style={{ boxShadow: "8px 0px 12px", overflow: "hidden" }}
                                cover={<img style={{height: "50vh", width: "50vw", overflow: "hidden"}} alt="example" src={item.cover} />}
                            >
                                <Meta
                                    title={
                                        <div id="Title" style={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
                                            <h1 style={{ marginLeft: "1vw", color: "white", fontSize: "1.5vw" }}>{item.title}</h1>
                                        </div>
                                    }
                                    description={
                                        <div id="Description">
                                            <p style={{ color: "white" }}>{}</p>
                                        </div>
                                    }
                                />
                            </Card> {/*Pass entire datasource as prop*/}
                        </div>
                    </List.Item>
                )}
            />
        );
    }
}

export default StreamsCategories;