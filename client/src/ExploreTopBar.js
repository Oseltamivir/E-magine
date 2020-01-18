import React from 'react';
import { Input, Icon, Button, Modal, Select, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

const { Search, TextArea } = Input;
const { Option } = Select;

var inputValues = {
    Link: "",
    Title: "",
    Desc: "",
    Topic: "",
}

class ExploreTopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            Link: "",
            Title: "",
            Desc: "",
            Topic: "",
        };
    }

    linkOnChange(e) {
        this.setState({ Link: e.target.value })
    }
    titleOnChange(e) {
        this.setState({ Title: e.target.value })
    }
    descOnChange(e) {
        this.setState({ Desc: e.target.value })
    }
    topicOnChange(e) {
        this.setState({ Topic: e })
    }

    showModal() {
        this.setState({ visible: true })
    }

    handleOk() {
        this.setState({ visible: false })
    }

    handleCancel() {
        this.setState({ visible: false })
    }

    submitForm(e) {
        inputValues.Link = this.state.Link
        inputValues.Title = this.state.Title
        inputValues.Desc = this.state.Desc
        inputValues.Topic = this.state.Topic
        console.log(inputValues)
    }

    render() {
        return (
            <div id="TopOptions" style={{ display: "flex" }}>
                <NavLink to='/createpost'>
                    <Button type="primary" size="large" style={{ marginRight: "0" }}>
                        Create Post
                    <Icon type="plus" />
                    </Button>
                </NavLink>
                
                <Search
                    placeholder="Search homework posts by people all across the globe!"
                    enterButton="Search"
                    size="large"
                    onSearch={value => console.log(value)}
                    allowClear
                    style={{ width: "50vw", marginLeft: "2vw", backgroundColor: "#002140" }}
                />
            </div>
        );
    }
}

export default ExploreTopBar;