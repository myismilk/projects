import React from 'react';
import { Form, Row, Col, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import './infoBody.less';
import PopUp from '../popUp';
import { config } from '../../globalConfig';

interface state {
    validated: boolean;
    oldPw: boolean;
    pw: boolean;
    confirm: boolean;
    popUp: boolean;
    content: string;
}

export default class body extends React.Component<{}, state>{
    oldPw: string = '';
    pw: string = '';
    constructor(props: {}) {
        super(props);
        this.state = {
            validated: false,
            pw: false,
            oldPw: false,
            confirm: false,
            popUp: false,
            content: ''
        }
    }

    check = (dom: any, reg: any) => {
        if (dom) {
            if (!reg.test(dom.value.trim())) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    checkValidity = () => {
        let pwBool: boolean, pwConfirmBool: boolean, oldPwBool: boolean;
        let oldPw: any = document.getElementById('oldPw');
        let reg = /^\S{8,16}$/;
        oldPwBool = this.check(oldPw, reg);
        this.oldPw = oldPw.value.trim();

        let pw: any = document.getElementById('pw');
        pwBool = this.check(pw, reg);
        this.pw = pw.value.trim();

        let pwConfirm: any = document.getElementById('pwConfirm');
        if (pwConfirm.value.trim() === pw.value.trim()) {
            pwConfirmBool = true;
        } else {
            pwConfirmBool = false;
        }
        this.setState(() => ({
            oldPw: !oldPwBool,
            pw: !pwBool,
            confirm: !pwConfirmBool
        }))

        return oldPwBool && pwBool && pwConfirmBool;
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let returnValue = this.checkValidity();
        if (returnValue) {
            fetch(config.domain + 'pwChange', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    oldPw: this.oldPw,
                    pw: this.pw
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
    }

    render() {

        return (
            <>
                {this.state.popUp ? (<PopUp content={this.state.content} />) : ''}
                <div className="info-body-container">
                    <Form className="info-Form" validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                旧的密码
                        </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="oldPw" isInvalid={this.state.oldPw} required type="password" placeholder="请输入当前密码"></Form.Control>
                                <Form.Control.Feedback type="invalid">密码格式错误!</Form.Control.Feedback>
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
                                <Button type="submit" block>提交修改</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </>
        )
    }
}