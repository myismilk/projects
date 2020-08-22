import React from 'react';
import PopUp from '../../components/popUp';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './register.less';
import { config } from '../../globalConfig';
import popUp from '../../components/popUp';

interface state {
    validated: boolean;
    popUp: boolean;
    user: boolean; //普通用户注册
    doctor: boolean; //医生注册
    content: string; //提示语
    idNum: boolean;
    workNum: boolean;
    workName: boolean;
    hosNum: boolean;
    nickName: boolean;
    account: boolean;
    pw: boolean;
    pwConfirm: boolean;
}

export default class register extends React.Component<{}, state>{
    idNumVal: string = '';
    nickNameVal: string = '';
    accountVal: string = '';
    pwVal: string = '';
    workNameVal: string = '';
    hosNumVal: string = '';
    workNumVal: string = '';
    constructor(props: {}) {
        super(props);
        this.state = {
            validated: false,
            popUp: false,
            user: true,
            doctor: false,
            content: '未按格式填写表单!',
            idNum: false,
            workNum: false,
            workName: false,
            hosNum: false,
            nickName: false,
            account: false,
            pw: false,
            pwConfirm: false,
        }
    }

    check = (dom: any, reg: any) => {
        if (dom) {
            if (!reg.test((dom.value.trim()))) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    checkValidity = () => {
        let returnValue: boolean;
        let idNumberBool: boolean, workNumberBool: boolean, workNameBool: boolean, hosNumberBool: boolean,
            nickNameBool: boolean, accountBool: boolean, pwBool: boolean, pwConfirmBool: boolean;
        if (this.state.user) {
            let idNumber: any = document.getElementById('idNumber');
            let reg = /^((\d{18})|(\d{17}x))$/;
            idNumberBool = this.check(idNumber, reg);
            this.idNumVal = idNumber.value.trim();

            let nickName: any = document.getElementById('nickName');
            reg = /^\S{1,16}$/;
            nickNameBool = this.check(nickName, reg);
            this.nickNameVal = nickName.value.trim();
            returnValue = idNumberBool && nickNameBool;
            this.setState(() => ({
                idNum: !idNumberBool,
                nickName: !nickNameBool,
            }))

        } else {
            let workNumber: any = document.getElementById('workNumber');
            let workName: any = document.getElementById('workName');
            let hosNumber: any = document.getElementById('hosNumber');
            let reg = /^[\w|\-|_]{1,30}$/;
            workNumberBool = this.check(workNumber, reg);
            hosNumberBool = this.check(hosNumber, reg);
            this.workNumVal = workNumber.value.trim();
            this.hosNumVal = hosNumber.value.trim();

            reg = /^\S{1,20}$/;
            workNameBool = this.check(workName, reg);
            this.workNameVal = workName.value.trim();

            this.setState(() => ({
                workNum: !workNumberBool,
                hosNum: !hosNumberBool,
                workName: !workNameBool
            }))
            returnValue = workNumberBool && hosNumberBool && workNameBool;
        }

        let account: any = document.getElementById('account');
        let reg = /^[\w]{4,15}$/;
        accountBool = this.check(account, reg);
        this.accountVal = account.value.trim();

        let pw: any = document.getElementById('pw');
        reg = /^\S{8,16}$/;
        pwBool = this.check(pw, reg);
        this.pwVal = pw.value.trim();

        let pwConfirm: any = document.getElementById('pwConfirm');

        if (pwConfirm.value.trim() !== pw.value.trim()) {
            pwConfirmBool = false;
        } else {
            pwConfirmBool = true;
        }

        this.setState(() => ({
            account: !accountBool,
            pw: !pwBool,
            pwConfirm: !pwConfirmBool
        }))
        return returnValue && accountBool && pwBool && pwConfirmBool;
    }

    handleSubmit = (event: any) => {
        //this.checkValidity()
        let _this = this;
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            let xhr = new XMLHttpRequest();
            xhr.open('POST', config.domain + "register", false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) {
                    return;
                }
                if (xhr.status < 300 && xhr.status >= 200) {
                    _this.setState(() => ({
                        popUp: true,
                        content: xhr.responseText
                    }));

                } else {
                    _this.setState(() => ({
                        popUp: true,
                        content: "请求失败，请刷新后重试!"
                    }))
                }
            }
            if (this.state.user) {
                xhr.send(JSON.stringify({
                    identity: 'user',
                    idNum: this.idNumVal,
                    nickName: this.nickNameVal,
                    account: this.accountVal,
                    pw: this.pwVal
                }));
            } else if (this.state.doctor) {
                xhr.send(JSON.stringify({
                    identity: 'doctor',
                    workName: this.workNameVal,
                    hosNum: this.hosNumVal,
                    workNum: this.workNumVal,
                    account: this.accountVal,
                    pw: this.pwVal
                }));
            }

        }
        this.setState(() => ({
            validated: true
        }))
    }

    changeRegister = () => {
        let check1: any = document.getElementById("formHorizontalRadios1");
        let check2: any = document.getElementById("formHorizontalRadios2");
        if (check1.checked) {
            this.setState(() => ({
                user: true,
                doctor: false,
                popUp: false
            }))
        } else if (check2.checked) {
            this.setState(() => ({
                user: false,
                doctor: true,
                popUp: false
            }))
        }
    }

    render() {
        return (
            <>
                {this.state.popUp ? <PopUp content={this.state.content} /> : ''}
                <Form className="register-Form" validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <fieldset className="register-title">
                        <span className="user-type">选择注册用户类型</span>
                        <span style={{ marginRight: '10px' }}>
                            <input name="formHorizontalRadios" type="radio" id="formHorizontalRadios1" defaultChecked onClick={this.changeRegister}></input>&nbsp;
                            <label title="">普通用户</label>
                        </span>
                        <span style={{ marginRight: '10px' }}>
                            <input name="formHorizontalRadios" type="radio" id="formHorizontalRadios2" onClick={this.changeRegister}></input>&nbsp;
                            <label title="">医生</label>
                        </span>
                    </fieldset>
                    <br />
                    {this.state.user ? (
                        <>
                            <Form.Group as={Row} controlId="formHorizontalID">
                                <Form.Label column sm={{ span: 2, offset: 2 }}>
                                    身份证号
                            </Form.Label>
                                <Col sm={7}>
                                    <Form.Control id="idNumber" isInvalid={this.state.idNum} required type="input" placeholder="18位数字或者17位数字以x结尾" />
                                    <Form.Control.Feedback type='invalid'>身份证号输入格式有误,请重新检查输入!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="formHorizontalNickName">
                                <Form.Label column sm={{ span: 2, offset: 2 }}>
                                    昵称
                        </Form.Label>
                                <Col sm={7}>
                                    <Form.Control id="nickName" isInvalid={this.state.nickName} required type="input" placeholder="16位以内非空字符" />
                                    <Form.Control.Feedback type='invalid'>昵称格式填写错误!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </>
                    ) : ''}

                    {this.state.doctor ? (
                        <>
                            <Form.Group as={Row} controlId="formHorizontalWorkNum">
                                <Form.Label column sm={{ span: 2, offset: 2 }}>
                                    员工编号
                            </Form.Label>
                                <Col sm={7}>
                                    <Form.Control id="workNumber" isInvalid={this.state.workNum} required type="input" placeholder="输入员工编号,注册时审核" />
                                    <Form.Control.Feedback type='invalid'>员工编号填写错误,请重新填写!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="formHorizontalWorkNum">
                                <Form.Label column sm={{ span: 2, offset: 2 }}>
                                    姓名
                            </Form.Label>
                                <Col sm={7}>
                                    <Form.Control id="workName" isInvalid={this.state.workNum} required type="input" placeholder="输入姓名,注册时审核" />
                                    <Form.Control.Feedback type='invalid'>姓名格式填写错误,请重新填写!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="formHorizontalHosNum">
                                <Form.Label column sm={{ span: 2, offset: 2 }}>
                                    医院编号
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control id="hosNumber" isInvalid={this.state.hosNum} required type="input" placeholder="输入医院编号" />
                                    <Form.Control.Feedback type='invalid'>医院编号填写错误,请重新填写!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </>) : ''}
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
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={{ span: 2, offset: 2 }}>
                            密码
                        </Form.Label>
                        <Col sm={7}>
                            <Form.Control id="pw" required isInvalid={this.state.pw} type="password" placeholder="8-16位数字、符号、大小写字母组成" />
                            <Form.Control.Feedback type={'invalid'}>密码格式错误!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} controlId="formHorizontalPassword02">
                        <Form.Label column sm={{ span: 2, offset: 2 }}>
                            密码确认
                        </Form.Label>
                        <Col sm={7}>
                            <Form.Control id="pwConfirm" required isInvalid={this.state.pwConfirm} type="password" placeholder="密码确认" />
                            <Form.Control.Feedback type={'invalid'}>两次输入密码不一样!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />
                    <Form.Group as={Row}>
                        <Col sm={{ offset: 4, span: 6 }}>
                            <Button type="submit" block>注册</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </>
        )
    }
}