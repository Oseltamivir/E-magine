import React from 'react';
import { Input, Button, Icon, Layout, Form, Checkbox } from 'antd';
import { ReactComponent as Logo } from './logo.svg';
import './index.css';

const { Content } = Layout

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            failedLogin: false,
            errorFetch: false,
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => { //validate fields
            if (!err) { //if error false
                console.log('Received values of form: ', values); //print out values received
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

                    if (data.success == true) {
                        this.props.loginHandler(data.token)
                    }
                    else {
                        this.setState({ failedLogin: true })
                    }

                }).catch((error) => {
                    this.setState({ errorFetch: true })
                })
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <Layout style={{ backgroundColor: "#002140", width: "100vw", height: "100vh" }}>
                <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "40vh", width: "50vw" }}>
                        <div style={{ fontSize: "8vw", color: "white" }}>
                            <Icon component={Logo} />
                            <span style={{ fontWeight: "500" }}> Exegesis</span>
                        </div>
                        <div style={{ color: "white", fontSize: "2vw" }}>
                            <p>Redefining Learning™</p>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#001529", width: "50vw", boxShadow: "-5px 0px 20px black" }}>
                        <h1 style={{ color: "white", fontSize: "3vw" }}>Register <Icon type="edit" theme="twoTone" /> </h1>
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
                            <Form.Item hasFeedback>
                                {getFieldDecorator('Confirm', {
                                    rules: [{
                                        required: true,
                                        message: 'Please enter your Password again!'
                                    },
                                    {
                                        validator:this.compareToFirstPassword,
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
                                </div>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                                        Register!
                                    </Button>
                                </div>
                            </Form.Item>
                            {/*Error Catching*/}
                            {this.state.failedLogin && (
                                <p style={{ color: "red", fontSize: "115%", marginTop: "0.8vh", textAlign: "center" }}>Invalid Username or Password</p>
                            )}
                            {this.state.errorFetch && (
                                <p style={{ color: "red", fontSize: "115%", marginTop: "0.8vh", textAlign: "center" }}>Error fetching response, please contact an administrator</p>
                            )}
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(Register);

export default WrappedNormalRegisterForm;
