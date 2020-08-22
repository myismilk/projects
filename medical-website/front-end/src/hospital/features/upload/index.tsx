import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import PopUp from '../../../components/popUp';
import './index.less';
import { config } from '../../../globalConfig';
import { isMainThread } from 'worker_threads';

interface state {
    validated: boolean;
    idNum: boolean;
    popUp: boolean;
    content: string;
}

export default class page extends React.Component<{}, state>{
    idNum: number | undefined = undefined;
    title: string = '';
    introduce: string = '';
    formData: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            validated: false,
            idNum: false,
            popUp: false,
            content: ''
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
        let idNumberBool: boolean;

        let idNumber: any = document.getElementById('idNumber');
        let reg = /^((\d{18})|(\d{17}x))$/;
        idNumberBool = this.check(idNumber, reg);

        if (idNumberBool) {
            this.idNum = idNumber.value.trim();
        } else {
            this.setState(() => ({
                popUp: true,
                content: '身份证输入格式错误,检查后重新输入!'
            }));
            return false;
        }
        return true;
    }

    handleSubmit = (event: any) => {
        let returnVal = this.checkValidity();
        event.preventDefault();
        event.stopPropagation();
        if (returnVal) {
            this.formData.append('title', this.title);
            this.formData.append('introduce', this.introduce);
            this.formData.append('idNum', this.idNum);

            fetch(config.domain + "hosUploadResult", {
                method: 'POST',
                credentials: 'include',
                body: this.formData
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
                if (val.message === '信息上传成功!') {
                    let form: any = document.getElementById("hos-upload-form");
                    form.reset();
                    let selectImg: any = document.getElementById('hosUpdateImgSelect');
                    selectImg.value = '';

                    let img: any = document.getElementById('hosUpdateImg');
                    img.value = '';
                    img.setAttribute('src', '');
                }
            })
        }
    }

    titleChange = (event: any) => {
        let val = event.target.value.trim();
        this.title = val;
    }

    introduceChange = (event: any) => {
        let val = event.target.value.trim();
        this.introduce = val;
    }

    componentDidMount() {
        let _this = this;
        let img: any = document.getElementById('hosUpdateImg');
        let selectImg: any = document.getElementById('hosUpdateImgSelect');
        selectImg.addEventListener('change', function (event: any) {
            var filePath = event.target.value,         //获取到input的value，里面是文件的路径
                fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
                src = window.URL.createObjectURL(event.target.files[0]); //转成可以在本地预览的格式
            // 检查是否是图片
            if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
                _this.setState(() => ({
                    popUp: true
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
                {this.state.popUp ? (<PopUp content={this.state.content} />) : ''}
                <div className="hos-upload-container">
                    <Form id="hos-upload-form" className="form" validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="formHorizontalID">
                            <Form.Label column sm={{ span: 2, offset: 2 }}>
                                身份证号
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="idNumber" required type="input" placeholder="18位数字或者17位数字以x结尾" />
                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row} controlId="formHorizontalNickName">
                            <Form.Label column sm={{ span: 3, offset: 1 }}>
                                检查结果<br />(png、jpg、jpeg格式文件)
                        </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="hosUpdateImg" as="img" />
                                <Form.Control id="hosUpdateImgSelect" required type="file" />
                            </Col>
                        </Form.Group>
                        <br />

                        <Form.Group as={Row} controlId="formHorizontalNickName">
                            <Form.Label column sm={{ span: 3, offset: 1 }}>
                                标题
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="contact" required type="input" placeholder="标题" onChange={this.titleChange} />
                            </Col>
                        </Form.Group>
                        <br />


                        <Form.Group as={Row} controlId="formHorizontalNickName">
                            <Form.Label column sm={{ span: 3, offset: 1 }}>
                                说明
                        </Form.Label>
                            <Col sm={7}>
                                <Form.Control id="introduce" required as="textarea" rows={5} placeholder="检查结果说明" onChange={this.introduceChange} />
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