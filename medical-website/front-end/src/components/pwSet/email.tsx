import React from 'react';
import { Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import './infoBody.less';
import PopUp from '../popUp';
import { config } from '../../globalConfig';

interface state {
    validated: boolean;
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
            popUp: false,
            content: '',
        }
    }

    sendCode = () => {
        let emailDom: any = document.getElementById("email");
        let email = emailDom.value.trim();
        let reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
        if(reg.test(email)){
            fetch(config.domain + 'sendEmail', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    email: email
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
        }else{
            this.setState(() => ({
                popUp: true,
                content: '请确保邮箱地址输入正确!'
            }))
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let emailDom: any = document.getElementById("email");
        let codeDom: any = document.getElementById('validateCode');
        let email = emailDom.value.trim(), code = codeDom.value.trim();
        if (code !== '') {
            //console.log(email, code);
            fetch(config.domain + 'emailBind', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    code: code
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
                content: '验证码不能为空',
                popUp: true
            }))
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
                                        placeholder="输入收到的验证码"
                                        id="validateCode"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="primary" onClick={this.sendCode}>发送邮件</Button>
                                    </InputGroup.Append>
                                </InputGroup>

                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row}>
                            <Col sm={{ offset: 4, span: 6 }}>
                                <Button type="submit" block>确认绑定</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </>
        )
    }
}