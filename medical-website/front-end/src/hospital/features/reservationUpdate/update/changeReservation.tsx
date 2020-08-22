import React from 'react';
import { Table, Button, Form, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import './index.less';
import { config } from '../../../../globalConfig';

interface state {
    department: any[];
    dataFromServer: any[];
}

export default class page extends React.Component<{}, state> {
    department: string = '内科';
    sun: boolean = false;
    mon: boolean = false;
    tue: boolean = false;
    wed: boolean = false;
    thu: boolean = false;
    fri: boolean = false;
    sat: boolean = false;
    maxDay: number = 1;
    constructor(props: {}) {
        super(props);
        this.state = {
            department: config.department,
            dataFromServer: []
        }
    }

    selectMaxDay = (event: any) => {
        this.maxDay = Number(event.target.value);
    }

    selectDay = (day: number, event: any) => {
        let val = event.target.value;
        if(val === 'on'){
            val = true;
        }
        switch (day) {
            case 0: this.sun = val; break;
            case 1: this.mon = val; break;
            case 2: this.tue = val; break;
            case 3: this.wed = val; break;
            case 4: this.thu = val; break;
            case 5: this.fri = val; break;
            case 6: this.sat = val; break;
            default: break;
        }
    }

    selectDepartment = (event: any) => {
        this.department = event.target.value;
        this.fetchData();
    }

    fetchData = () => {
        fetch(config.domain + "updateReservationdownload", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                department: this.department
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            this.setState(() => ({
                dataFromServer: val
            }))
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    update = (index: number) => {
        fetch(config.domain + "updateReservationUpdate", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                doctorId: this.state.dataFromServer[index].doctorId,
                maxDay: this.maxDay,
                sun: this.sun,
                mon: this.mon,
                tue: this.tue,
                wed: this.wed,
                thu: this.thu,
                fri: this.fri,
                sat: this.sat
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                alert('安排更新成功!');
            } else {
                throw new Error(res.statusText);
            }
        })

    }

    render() {
        //设置每个医生每天可预约人数
        let numArr: any = [];
        for (let i = 0; i < 100; i++) {
            numArr[i] = i + 1;
        }
        return (
            <>
                <div className="update-header">
                    <Form className="form">
                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 3 }}>
                                请选择科室:&nbsp;
                            </Form.Label>
                            <Form.Control as="select" onChange={this.selectDepartment}>
                                {this.state.department.map(el => {
                                    return (
                                        <option key={el}>{el}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>医生编号</th>
                            <th>医生姓名</th>
                            <th>出诊时间安排</th>
                            <th>每日预约数量上限</th>
                            <th>提交更新</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dataFromServer.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el.workNum}</td>
                                    <td>{el.name}</td>
                                    <td>
                                        <Table striped bordered hover className="inner-table">
                                            <thead>
                                                <tr>
                                                    <th>日</th>
                                                    <th>一</th>
                                                    <th>二</th>
                                                    <th>三</th>
                                                    <th>四</th>
                                                    <th>五</th>
                                                    <th>六</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Form.Check onChange={this.selectDay.bind(this, 0)}></Form.Check></td>
                                                    <td><Form.Check onChange={this.selectDay.bind(this, 1)}></Form.Check></td>
                                                    <td><Form.Check onChange={this.selectDay.bind(this, 2)}></Form.Check></td>
                                                    <td><Form.Check onChange={this.selectDay.bind(this, 3)}></Form.Check></td>
                                                    <td><Form.Check onChange={this.selectDay.bind(this, 4)}></Form.Check></td>
                                                    <td><Form.Check onChange={this.selectDay.bind(this, 5)}></Form.Check></td>
                                                    <td><Form.Check onChange={this.selectDay.bind(this, 6)}></Form.Check></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </td>
                                    <td>
                                        <Form.Control as="select" onChange={this.selectMaxDay}>
                                            {numArr.map((el: any) => {
                                                return (
                                                    <option key={el}>{el}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </td>
                                    <td><Button variant="primary" onClick={this.update.bind(this, index)}>更新</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )
    }
}