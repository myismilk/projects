import React from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import { config } from '../../../../globalConfig';

interface state {
    timeY: any[];
    timeM: any[];
    timeD: any[];
}

interface props {
    setReservationList: (arr: any[], department: string, time: string) => void;
}

export default class reservation extends React.Component<props, state>{
    department: string = '内科';
    y: number | undefined = undefined;
    m: number | undefined = undefined;
    d: number | undefined = undefined;
    constructor(props: props) {
        super(props);
        this.state = {
            timeY: [],
            timeM: [],
            timeD: [],
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        this.getReservationList();
    }

    getReservationList = () => {
        fetch(config.domain + "hosGetReservationList", {
            method: 'POST',
            body: JSON.stringify({
                department: this.department,
                time: this.y + "-" + this.m + "-" + this.d
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            console.log(this.y + "-" + this.m + "-" + this.d, this.department, val);
            this.props.setReservationList(val, this.department, this.y + "-" + this.m + "-" + this.d);
        })
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let timeY = [year], timeM = [month - 1, month], timeD = [day];
        if (month === 12) {
            timeY.push(year + 1);
            timeM.push(1);
        } else {
            timeM.push(month + 1);
        }
        this.setDay(year, month - 1, 0);
        this.setState(() => ({
            timeY: timeY,
            timeM: timeM,
        }));
        this.y = timeY[0];
        this.m = timeM[0];
        this.getReservationList();
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
        let val = Number((event.target.value).trim());
        if (str === 'y') {
            this.y = val;
        }
        if (str === 'm') {
            val = Number(val);
            let day = 0;
            this.setDay(this.y, val, day);
            this.m = val;
        }
        if (str === 'd') {
            this.d = val;
        }
    }

    chooseDepart = (event: any) => {
        let depart = event.target.value;
        this.department = depart;
    }

    render() {
        return (
            <>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label>
                            请选择科室:&nbsp;
                        </Form.Label>
                        <Form.Control as="select" style={{ width: '120px' }} onChange={this.chooseDepart}>
                            {config.department.map(el => {
                                return (
                                    <option key={el}>{el}</option>
                                )
                            })}
                        </Form.Control>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Form.Label>
                            选择查看时间:&nbsp;&nbsp;&nbsp;
                        </Form.Label>
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
                                {this.state.timeM.map(el => {
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

                        <Form.Group>
                            <Button type="submit" className="view-choose-btn">查看</Button>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </>
        )
    }
}