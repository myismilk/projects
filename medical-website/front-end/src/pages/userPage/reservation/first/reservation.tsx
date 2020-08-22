import React from 'react';
import { Form, Row, Col, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { config } from '../../../../globalConfig';
import PopUp from '../../../../components/popUp';

interface state {
    timeY: any[];
    timeM: any[];
    timeD: any[];
    time: string;
    doctorList: any[];
    popUp: boolean;
    content: string;
}

export default class reservation extends React.Component<{}, state>{
    department: string = '内科';
    y: number | undefined = undefined;
    m: number | undefined = undefined;
    d: number | undefined = undefined;
    doctorId: number | undefined = undefined;
    constructor(props: {}) {
        super(props);
        this.state = {
            timeY: [],
            timeM: [],
            timeD: [],
            time: '',
            doctorList: [],
            popUp: false,
            content: ''
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.doctorId !== undefined) {
            fetch(config.domain + 'makeReservation', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    doctorId: this.doctorId,
                    y: this.y,
                    m: this.m,
                    d: this.d
                })
            }).then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.text();
                } else {
                    throw new Error(res.statusText);
                }
            }).then(val => {
                this.setState(() => ({
                    content: val,
                    popUp: true
                }))
            })
        } else {
            this.setState(() => ({
                popUp: true,
                content: '还没选择医生进行预约!'
            }))
        }
    }

    selectDoctor = (event: any) => {
        let index = Number(event.target.value);
        this.doctorId = this.state.doctorList[index].doctorId;
    }

    getDoctorList = () => {
        let date;
        if (this.y != undefined && this.m !== undefined && this.d !== undefined) {
            date = new Date(this.y, this.m - 1, this.d);
        }
        let weekDay = date?.getDay();
        fetch(config.domain + "userGetDoctorList", {
            method: 'POST',
            body: JSON.stringify({
                department: this.department,
                day: weekDay
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            if (val.length >= 1)
                this.doctorId = val[0].doctorId;
            this.setState(() => ({
                doctorList: val,
                popUp: false
            }))
        })
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (day === 31 || (day === 30 && month % 2 === 0)) {
            month += 1;
            day = 0;
        } else if (month === 2 && ((day === 29) || !(day === 28 && (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0))) {
            month += 1;
            day = 0;
        }
        let timeY = [year], timeM = [month], timeD = [day];
        if (month === 12) {
            timeY.push(year + 1);
            timeM.push(1);
        } else {
            timeM.push(month + 1);
        }
        this.setDay(year, month, day);
        this.setState(() => ({
            timeY: timeY,
            timeM: timeM,
        }));
        this.y = timeY[0];
        this.m = timeM[0];
        this.getDoctorList();
    }

    setDay = (y: number | undefined, m: number | undefined, d: number | undefined) => {
        let dayArr: any = [];
        if (y !== undefined && m !== undefined && d !== undefined) {
            if (m % 2 !== 0) {
                if (d !== 31) {
                    for (let i = d + 1; i <= 31; i++) {
                        dayArr.push(i);
                    }
                }
            } else {
                if (m !== 2 && d !== 30) {
                    for (let i = d + 1; i <= 30; i++) {
                        dayArr.push(i);
                    }
                } else if (m === 2 && ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) && d !== 29) {
                    for (let i = d + 1; i <= 29; i++) {
                        dayArr.push(i);
                    }
                } else if (m === 2 && d !== 28) {
                    for (let i = d + 1; i <= 28; i++) {
                        dayArr.push(i);
                    }
                }
            }
        }
        this.setState(() => ({
            timeD: dayArr
        }))
        this.d = dayArr[0];
    }

    timeSelect = (str: string, event: any) => {
        this.doctorId = undefined;
        let val = Number((event.target.value).trim());
        if (str === 'y') {
            this.y = val;
        }
        if (str === 'm') {
            val = Number(val);
            let day = 0;
            if (val === (new Date()).getMonth() + 1)
                day = (new Date()).getDate();
            this.setDay(this.y, val, day);
            this.m = val;
        }
        if (str === 'd') {
            this.d = val;
        }
        this.getDoctorList();
    }

    chooseDepart = (event: any) => {
        let depart = event.target.value;
        this.department = depart;
        this.getDoctorList();
    }

    render() {
        return (
            <>
                {this.state.popUp ? (<PopUp content={this.state.content} />) : ''}
                <Form className="form" noValidate onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={{ span: 2, offset: 2 }}>
                            请选择科室:
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control style={{ width: '120px' }} as="select" onChange={this.chooseDepart}>
                                {config.department.map(el => {
                                    return (
                                        <option key={el}>{el}</option>
                                    )
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={{ span: 2, offset: 2 }}>
                            选择预约时间:
                    </Form.Label>
                        <Col sm={8}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>年&nbsp;</Form.Label>
                                <Form.Control as="select" onChange={this.timeSelect.bind(this, 'y')}>
                                    {this.state.timeY.map(el => {
                                        return (
                                            <option key={el}>{el}</option>
                                        )
                                    })}
                                </Form.Control>
                                &nbsp;&nbsp;
                                <Form.Label>月&nbsp;</Form.Label>
                                <Form.Control as="select" onChange={this.timeSelect.bind(this, 'm')}>
                                    {this.state.timeM.map((el, index) => {
                                        return (
                                            <option key={el}>{el}</option>
                                        )
                                    })}
                                </Form.Control>
                                &nbsp;&nbsp;
                                <Form.Label>日&nbsp;</Form.Label>
                                <Form.Control as="select" onChange={this.timeSelect.bind(this, 'd')}>
                                    {this.state.timeD.map(el => {
                                        return (
                                            <option key={el}>{el}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={{ span: 2, offset: 2 }}>
                            可预约医生:
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control style={{ width: '120px' }} as="select" onChange={this.selectDoctor}>
                                {this.state.doctorList.map((el, index) => {
                                    return (
                                        <option key={el.name} value={index}>{el.name}</option>
                                    )
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 4, offset: 4 }}>
                            <Button type="submit" block>确认预约</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </>
        )
    }
}