import React from 'react';
import { Input, Button, Icon, Layout, Form, Checkbox } from 'antd';
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from './logo.svg';
import './index.css';
import Background from './bg1.jpg';

const { Content } = Layout


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            failedLogin: false,
            errorFetch: false,
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(window.baseURL + '/api/v1/auth/login', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "username": values.username,
                        "password": values.password,
                    })
                }).then((results) => {
                    return results.json(); //return data in JSON (since its JSON data)
                }).then((data) => {

                    this.setState({ errorFetch: false })


                    if (data.success === true) {
                        this.props.loginHandler(data.token)
                    }
                    else { 
                        message.error({ content: "Incorrect username or password" });
                    }

                }).catch((error) => {
                    message.error({ content: "Oops... Error fetching response " });
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (

                <Layout style={{ backgroundColor: "#002140", maxWidth: "100vw", maxHeight: "100vh", overflow: "hidden" }}>
                    <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "80vw", backgroundImage: "url("+ Background + ")", backgroundSize: `cover`, overflow:`hidden` }}>
                            <div style={{ fontSize: "8vw", color: "white" }}>
                                <Icon component={Logo} />
                                <span style={{ fontWeight: "500",textShadow: '1px -1px 1px -1px #000000' }}> Exegesis</span>
                            </div>
                            <div style={{ color: "white", fontSize: "2vw" }}>
                                <p style={{textShadow: '1px 1px 1px 1px #000000'}}>Redefining Learning™</p>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#001529", width: "40vw", boxShadow: "-5px 0px 20px black" }}>
                            <h1 style={{ color: "white", fontSize: "3vw" }}>Sign In <Icon type="unlock" theme="twoTone" /> </h1>
                            <Form layout="vertical" onSubmit={this.handleSubmit} className="login-form" style={{ width: "30vw" }}>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please enter your username!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please enter your Password!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <div id="RememberForget" style={{ display: "flex", marginBottom: "2vh" }}>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(<Checkbox style={{ color: "#cccccc", fontSize: "120%" }}>Remember me</Checkbox>)}

                                        <a className="login-form-forgot" style={{ marginLeft: "auto", fontSize: "120%" }} href="">
                                            Forgot password
                                    </a>

                                </div>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                                        Log in
                                    </Button>
                                    <p style={{ color: "#cccccc", fontSize: "115%", marginTop: "0.8vh" }}>Or <a onClick = {this.props.register}>register now!</a></p>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
