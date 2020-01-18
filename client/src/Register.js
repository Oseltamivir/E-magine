import React from 'react';
import { Input, Button, Icon, Layout, Form, Checkbox, message } from 'antd';
import { ReactComponent as Logo } from './logo.svg';
import './index.css';
import Background from './bg1.jpg';

const { Content } = Layout

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => { //validate fields
            if (!err) { //if error false
                console.log('Received values of form: ', values); //print out values received
                fetch(window.baseURL + '/api/v1/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "username": values.username,
                        "password": values.password,
                    })

                }).then((results) => {
                    return results.json(); //return data in JSON (since its JSON data)
                }).then((data) => {

                    if (data.success == true) {
                        message.success({ content: "Successfully Registered! Welcome to Exegesis" });
                        this.props.loginHandler(data.token)
                    }
                    else {
                        message.error({ content: "All blanks must be filled in" });
                    }

                }).catch((error) => {
                    message.error({ content: "Connection error" });
                })
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('The two passwords that you entered are inconsistent');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <Layout style={{ backgroundColor: "#002140", width: "100vw", height: "100vh" }}>
                <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "80vw", backgroundImage: "url("+ Background + ")", backgroundSize: `cover`, overflow:`hidden`  }}>
                        <div style={{ fontSize: "8vw", color: "white" }}>
                            <Icon component={Logo} />
                            <span style={{ fontWeight: "500" }}> Exegesis</span>
                        </div>
                        <div style={{ color: "white", fontSize: "2vw" }}>
                            <p>Redefining Learning™</p>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#001529", width: "40vw", boxShadow: "-5px 0px 20px black" }}>
                        <h1 style={{ color: "white", fontSize: "3vw" }}>Register <Icon type="edit" theme="twoTone" /> </h1>
                        <Form layout="vertical" onSubmit={this.handleSubmit} className="login-form" style={{ width: "30vw" }}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please enter your username' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please enter your Password' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}

                            </Form.Item>
                            <Form.Item hasFeedback>
                                {getFieldDecorator('Confirm', {
                                    rules: [{
                                        required: true,
                                        message: 'Please enter your Password again'
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Confirm Password"
                                    />,
                                )}

                            </Form.Item>
                            <Form.Item>
                                <div id="RememberForget" style={{ display: "flex", marginBottom: "2vh" }}>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox style={{ color: "#cccccc", fontSize: "120%" }}>Remember me</Checkbox>)}
                                    <a className="register-form-cancel" style={{ marginLeft: "auto", fontSize: "120%" }} onClick = {this.props.register}>Cancel Registration</a>
                                </div>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                                        Register!
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(Register);

export default WrappedNormalRegisterForm;
