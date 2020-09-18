import React from 'react';
import { Card, Icon, Spin, List } from 'antd';
import { Link} from 'react-router-dom';
import './index.css';

const { Meta } = Card;

const Categories = [
    {
        topic: "Maths",
        title: (<div>Mathematics <Icon type="pie-chart" theme="twoTone" /></div>),
        cover: require(".//assets/maths.jpeg"),
    },
    {
        topic: "Physics",
        title: (<div>Physics <Icon type="rocket" theme="twoTone" /></div>),
        cover: require('.//assets/physics.jpeg')
    },
    {
        topic: "Chemistry",
        title: (<div>Chemistry <Icon type="experiment" theme="twoTone" /></div>),
        cover: require('.//assets/chem.jpeg')
    },
    {
        topic: "Computing",
        title: (<div>Computing <Icon type="hdd" theme="twoTone" /></div>),
        cover: require('.//assets/comp.jpeg')
    },
    {
        topic: "Economics",
        title: (<div>Economics <Icon type="fund" theme="twoTone" /></div>),
        cover: require('.//assets/economics.jpg')
    },
];

class ExploreCategories extends React.Component {

    cardClick() {

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
                        <Link to={"Explore/" + item.topic}>
                            <div onClick={this.cardClick(item.title)} key={item.id}>
                                <Card
                                    hoverable
                                    type="inner"
                                    bordered={false}
                                    bodyStyle={{ backgroundColor: "#001529" }}
                                    style={{ boxShadow: "8px 0px 12px", overflow: "hidden" }}
                                    cover={<img style={{ height: "50vh", width: "80vw", overflow: "hidden" }} alt="example" src={item.cover} />}
                                >
                                    <Meta
                                        title={
                                            <div id="Title" style={{ display: "flex", textAlign: "center" }}>
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
                        </Link>
                    </ List.Item>
                )}
            />
        );
    }
}

export default ExploreCategories;