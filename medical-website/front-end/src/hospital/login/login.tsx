import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import PopUp from '../../components/popUp';
import icon from '../../img/smile.png';
import './login.less';
import { config } from '../../globalConfig';

interface state {
    popUp: boolean;
    content: string;
    loginSuc: boolean;
    validated: boolean;
    pwV: boolean;
    accountV: boolean;
}

export default class login extends React.Component<{}, state> {
    cRef1: any;
    account: string = '';
    pw: string = '';
    constructor(props: {}) {
        super(props);
        this.state = {
            content: "请选择登录身份!",
            popUp: false,
            loginSuc: false,
            validated: false,
            pwV: false,
            accountV: false
        }
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
            xhr.open('POST', config.domain + "hosLogin", false);
            xhr.withCredentials = true;
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) {
                    return;
                }
                if (xhr.status < 300 && xhr.status >= 200) {
                    let res = xhr.responseText;
                    if (res === 'succeed') {
                        _this.setState(() => ({
                            loginSuc: true
                        }));
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
                account: this.account,
                pw: this.pw
            }));
        }
        this.setState(() => ({
            validated: true
        }))
    }

    render() {
        if (this.state.loginSuc) {
            return (<Redirect to="/hospital/features" />)
        }

        return (
            <>
                {this.state.popUp ? <PopUp content={this.state.content} /> : ''}
                <Form className="hos-login-Form" validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <p className="title"><img className="icon" src={icon} />大白菜健康中心</p>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={{ span: 2, offset: 1 }}>
                            账号
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control id="account" required type="input" placeholder="账号" />
                            <Form.Control.Feedback type='invalid'>请输入正确账号!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={{ span: 2, offset: 1 }}>
                            密码
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control id="pw" isInvalid={this.state.pwV} required type="password" placeholder="密码" />
                            <Form.Control.Feedback type={'invalid'}>请输入正确密码!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Button type="submit" block>登录</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </>
        )
    }
}