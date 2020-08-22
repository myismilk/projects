import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";
import PopUp from '../../components/popUp';
import icon from '../../img/smile.png';
import './login.less';
import { config } from '../../globalConfig';

interface state {
    popUp: boolean;
    content: string;
    toRegister: boolean;
    loginUser: boolean;
    loginDoctor: boolean;
    validated: boolean;
    pwV: boolean;
    accountV: boolean;
}

export default class login extends React.Component<{}, state> {
    cRef1: any;
    identity: string = '';
    account: string = '';
    pw: string = '';
    constructor(props: {}) {
        super(props);
        this.state = {
            content: "请选择登录身份!",
            popUp: false,
            toRegister: false,
            loginUser: false,
            loginDoctor: false,
            validated: false,
            pwV: false,
            accountV: false
        }
    }

    toRegister = () => {
        this.setState(() => ({
            toRegister: true
        }))
    }

    checkValidity = () => {
        let account: any = document.getElementById('account');
        let pw: any = document.getElementById('pw');
        let reg1 = /^[\w]{4,20}$/;
        let reg2 = /^\S{8,16}$/;
        if (!reg1.test(account.value.trim()) || !reg2.test(pw.value.trim())) {
            this.setState(() => ({
                content: '账号或密码输入错误,请重新输入!',
                popUp: true
            }))
            return false;
        }
        this.account = account.value.trim();
        this.pw = pw.value.trim();

        let c1: any = document.getElementById("formHorizontalRadios1");
        let c2: any = document.getElementById("formHorizontalRadios2");
        if (!c1.checked && !c2.checked) {
            this.setState(() => ({
                popUp: true,
                content: '请选择登录身份!'
            }))
            return false;
        }
        this.identity = c1.checked ? 'user' : 'doctor';
        return true;
    }

    handleSubmit = (event: any) => {
        let _this = this;
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            let xhr = new XMLHttpRequest();
            xhr.open('POST', config.domain + "login", false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) {
                    return;
                }
                if (xhr.status < 300 && xhr.status >= 200) {
                    let res = xhr.responseText;
                    if (res === 'succeed') {
                        if(_this.identity === 'user'){
                            _this.setState(() => ({
                                loginUser: true
                            }));
                        }else{
                            _this.setState(() => ({
                                loginDoctor: true
                            }));
                        }
                        
                    } else {
                        _this.setState(() => ({
                            popUp: true,
                            content: res
                        }));
                    }
                } else {
                    _this.setState(() => ({
                        popUp: true,
                        content: "登录失败，请刷新后重试!"
                    }))
                }
            }
            xhr.send(JSON.stringify({
                identity: this.identity,
                account: this.account,
                pw: this.pw
            }));
        }
        this.setState(() => ({
            validated: true
        }))
    }

    render() {
        if (this.state.loginUser) {
            return (<Redirect to="/chooseHos" />)
        }
        if (this.state.loginDoctor) {
            return (<Redirect to="/doctor" />)
        }
        if (this.state.toRegister) {
            return (<Redirect to="/register" />)
        }
        return (
            <>
                {this.state.popUp ? <PopUp content={this.state.content} /> : ''}
                <Form className="login-Form" validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <p className="title"><img className="icon" src={icon} />大白菜健康中心</p>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            账号
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="account" required type="input" placeholder="账号" />
                            <Form.Control.Feedback type='invalid'>请输入正确账号!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            密码
                </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="pw" isInvalid={this.state.pwV} required type="password" placeholder="密码" />
                            <Form.Control.Feedback type={'invalid'}>请输入正确密码!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label sm={2}>
                                登录身份
                            </Form.Label>
                            &nbsp;&nbsp;
                            <Col sm={{ span: 9, offset: 0 }}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="普通用户"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="医生"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" block>登录</Button>
                            <Link className="btn-pwFind" to="pwForget" target="__blank">忘记密码?</Link>
                            <Button className="btn-register" variant="link" onClick={this.toRegister}>前往注册</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </>
        )
    }
}