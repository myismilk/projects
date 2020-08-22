import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import PopUp from '../../../components/popUp';
import './index.less';
import {config} from '../../../globalConfig';

interface state {
    validated: boolean;
    contact: boolean;
    introduce: boolean;
    popUp: boolean;
    content: string;
}

export default class page extends React.Component<{}, state>{
    formData: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            validated: false,
            contact: false,
            introduce: false,
            popUp: false,
            content: ''
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        let contactDom: any = document.getElementById('doctor-contact');
        let desDom: any = document.getElementById("doctor-introduce");
        this.formData.append('contact', contactDom.value.trim());
        this.formData.append('des', desDom.value.trim());

        fetch(config.domain + "doctorInfoUpdate", {
            method: 'POST',
            credentials: 'include',
            body: this.formData
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.text();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            this.setState(() => ({
                popUp: true,
                content: val
            }))
        })
    }

    componentDidMount() {
        let _this = this;
        let img: any = document.getElementById('img');
        let selectImg: any = document.getElementById('imgSelect');
        selectImg.addEventListener('change', function (event: any) {
            var filePath = event.target.value,         //获取到input的value，里面是文件的路径
                fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
                src = window.URL.createObjectURL(event.target.files[0]); //转成可以在本地预览的格式
            // 检查是否是图片
            if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
                _this.setState(() => ({
                    popUp: true,
                    content: "上传错误,文件格式必须为：png/jpg/jpeg"
                }))
                event.target.value = '';
                return;
            }
            img.setAttribute('src', src);
            _this.formData = new FormData();
            _this.formData.append('file', selectImg.files[0]);
        });
    }

    render() {
        return (
            <>
                {this.state.popUp ? (<PopUp content={this.state.content}/>) : ''}
                <div className="info-update-container">
                    <Form className="form" validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="formHorizontalNickName">
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                展示照片
                        </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="img" isInvalid={this.state.introduce} as="img" />
                                <Form.Control id="imgSelect" isInvalid={this.state.introduce} required type="file" />
                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row} controlId="formHorizontalNickName">
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                联系方式
                        </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="doctor-contact" isInvalid={this.state.contact} required type="input" placeholder="电话、邮箱等联系方式" />
                                <Form.Control.Feedback type='invalid'>输入不能为空!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row} controlId="formHorizontalNickName">
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                个人简介
                        </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="doctor-introduce" isInvalid={this.state.introduce} required as="textarea" rows={5} placeholder="电话、邮箱等联系方式" />
                                <Form.Control.Feedback type='invalid'>输入不能为空!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row}>
                            <Col sm={{ offset: 4, span: 6 }}>
                                <Button type="submit" block>提交</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </>
        )
    }
}