import React from 'react';
import { Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import './pwReset.less';
import PopUp from '../popUp';
import { config } from '../../globalConfig';

interface state {
    validated: boolean;
    popUp: boolean;
    content: string;
    pw: boolean;
    confirm: boolean;
    account: boolean;
}

export default class body extends React.Component<{}, state>{
    pw: string = '';
    account: string = '';
    identtity: string = 'user';
    constructor(props: {}) {
        super(props);
        this.state = {
            validated: false,
            popUp: false,
            content: '',
            pw: false,
            confirm: false,
            account: false,
        }
    }

    sendCode = () => {
        //console.log('test');
        let accountDom: any = document.getElementById('account');
        let reg = /^[\w]{4,15}$/;
        let account = accountDom.value.trim();

        let emailDom: any = document.getElementById("email");
        let email = emailDom.value.trim();
        let reg2 = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
        if (reg.test(account) && reg2.test(email)) {
            fetch(config.domain + 'pwForgetSendEmail', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    account: account,
                    identity: this.identtity
                })
            }).then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            }).then(val => {
                this.setState(() => ({
                    popUp: true,
                    content: val.message
                }))
            })
        } else {
            this.setState(() => ({
                popUp: true,
                content: '请确保邮箱地址与账号输入正确!'
            }))
        }
    }

    checkValidate = () => {
        let pwBool: boolean, pwConfirmBool: boolean, accountBool: boolean;
        let account: any = document.getElementById('account');
        let reg = /^[\w]{4,15}$/;
        accountBool = reg.test(account.value.trim());
        this.account = account.value.trim();

        let pw: any = document.getElementById('pw');
        reg = /^\S{8,16}$/;
        pwBool = reg.test(pw.value.trim());
        this.pw = pw.value.trim();

        let pwConfirm: any = document.getElementById('pwConfirm');
        if (pwConfirm.value.trim() === pw.value.trim()) {
            pwConfirmBool = true;
        } else {
            pwConfirmBool = false;
        }
        this.setState(() => ({
            popUp: false,
            account: !accountBool,
            pw: !pwBool,
            confirm: !pwConfirmBool
        }))

        return accountBool && pwBool && pwConfirmBool;
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let emailDom: any = document.getElementById("email");
        let codeDom: any = document.getElementById('validateCode');
        let email = emailDom.value.trim(), code = codeDom.value.trim();
        if (code !== '') {
            let returnValue = this.checkValidate();
            if (returnValue) {
                fetch(config.domain + 'pwReset', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({
                        account: this.account,
                        email: email,
                        code: code,
                        pw: this.pw,
                        identity: this.identtity
                    })
                }).then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }
                }).then(val => {
                    this.setState(() => ({
                        popUp: true,
                        content: val.message
                    }))
                })
            }
        } else {
            this.setState(() => ({
                content: '验证码不能为空',
                popUp: true
            }))
        }
    }

    changeIdentity = () => {
        let check1: any = document.getElementById("identity1");
        let check2: any = document.getElementById("identity2");
        if (check1.checked) {
            this.identtity = 'user';
        } else if (check2.checked) {
            this.identtity = 'doctor';
        }
    }

    render() {
        return (
            <>
                {this.state.popUp ? (<PopUp content={this.state.content} />) : ''}
                <div className="pw-forget-container">
                    <Form className="info-Form" validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <fieldset className="title">
                            <span className="user-type">用户账号类型&nbsp;&nbsp;</span>
                            <span style={{ marginRight: '10px' }}>
                                <input name="formHorizontalRadios" type="radio" id="identity1" defaultChecked onClick={this.changeIdentity}></input>&nbsp;
                            <label title="">普通用户</label>
                            </span>
                            <span style={{ marginRight: '10px' }}>
                                <input name="formHorizontalRadios" type="radio" id="identity2" onClick={this.changeIdentity}></input>&nbsp;
                            <label title="">医生</label>
                            </span>
                        </fieldset>
                        <br />
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                账号
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="account" isInvalid={this.state.account} required type="input" placeholder="4-8位数字、大小写字母组成" />
                                <Form.Control.Feedback type='invalid'>账号格式填写错误!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                输入邮箱
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="email" required type="email" placeholder="请输入需要绑定的邮箱"></Form.Control>
                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                验证码
                            </Form.Label>
                            <Col sm={6}>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        required
                                        placeholder="输入收到的验证码"
                                        id="validateCode"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="primary" onClick={this.sendCode} type="button">发送邮件</Button>
                                    </InputGroup.Append>
                                </InputGroup>

                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                新的密码
                        </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="pw" required isInvalid={this.state.pw} type="password" placeholder="8-16位数字、符号、大小写字母组成" />
                                <Form.Control.Feedback type="invalid">密码格式错误!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                密码确认
                        </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="pwConfirm" required isInvalid={this.state.confirm} type="password" placeholder="密码确认" />
                                <Form.Control.Feedback type="invalid">两次输入密码不一样!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row}>
                            <Col sm={{ offset: 4, span: 6 }}>
                                <Button type="button" onClick={this.handleSubmit} block>确认绑定</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </>
        )
    }
}