import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Chat from './chat';
import './index.less';
import { config } from '../../../globalConfig';

interface state {
    doctorList: any[];
    doctor: any;
}

export default class consultation extends React.Component<{}, state>{
    department: string = '内科';
    doctorId: number | undefined = undefined;
    doctorName: string = '';

    constructor(props: {}) {
        super(props);
        this.state = {
            doctorList: [],
            doctor: {}
        }
    }

    getDoctorList = () => {
        fetch(config.domain + "chatGetDoctorList", {
            method: 'POST',
            body: JSON.stringify({
                department: this.department,
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            if (val.length >= 1 && val[0].name !== undefined) {
                this.doctorId = val[0].doctorId;
                this.doctorName = val[0].name;
            }
            this.setState(() => ({
                doctorList: val
            }))
        })
    }

    selectDepart = (event: any) => {
        this.department = event.target.value;
        this.getDoctorList();
    }

    selectDoctor = (event: any) => {
        let index = Number(event.target.value);
        this.doctorId = this.state.doctorList[index].doctorId;
        this.doctorName = this.state.doctorList[index].name;
    }

    componentDidMount() {
        this.getDoctorList();
    }

    confirmDoctor = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let doctor = {
            doctorId: this.doctorId,
            name: this.doctorName
        };
        if (this.doctorId !== undefined) {
            this.setState(() => ({
                doctor: doctor
            }))
        }
    }

    render() {
        return (
            <div className="user-consultation-container">
                <Form className="form">
                    <Form.Group as={Row} style={{ margin: '0' }}>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>
                                    请选择科室:&nbsp;&nbsp;
                                </Form.Label>
                                <Form.Control as="select" onChange={this.selectDepart}>
                                    {config.department.map((el, index) => {
                                        return (
                                            <option>{el}</option>
                                        )
                                    })}
                                </Form.Control>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Form.Label>
                                    请选择医生:&nbsp;&nbsp;
                                </Form.Label>
                                <Form.Control as="select" onChange={this.selectDoctor}>
                                    {this.state.doctorList.map((el, index) => {
                                        return (
                                            <option key={el.name} value={index}>{el.name}</option>
                                        )
                                    })}
                                </Form.Control>

                                <Button onClick={this.confirmDoctor} variant="primary" style={{ marginLeft: '30px' }}>确定</Button>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                </Form>
                <div className="chat-container">
                    <Chat doctor={this.state.doctor} />
                </div>
            </div>
        )
    }
}