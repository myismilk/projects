import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { config } from '../../../globalConfig';
import './index.less';

interface state {
    viewList: any[];
}

export default class page extends React.Component<{}, state>{
    constructor(props: {}) {
        super(props);
        this.state = {
            viewList: []
        }
    }

    componentDidMount() {
        fetch(config.domain + "viewDoctorRegister", {
            method: 'POST',
            credentials: 'include'
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                console.log(response.statusText);
            }
        }).then((val) => {
            this.setState(() => ({
                viewList: val
            }));
        })
    }

    viewPassOrNot = (yesOrNo: boolean, index: number) => {
        let departmentDom: any = document.getElementById('select' + index);
        let department = departmentDom.value;
        let workNum = this.state.viewList[index].workNum;
        let doctorId = this.state.viewList[index].doctorId;
        let arr = this.state.viewList;
        arr.splice(index, 1);
        fetch(config.domain + "passOrNot", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                passOrNot: yesOrNo,
                department: department,
                workNum: workNum,
                doctorId: doctorId
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                this.setState(() => ({
                    viewList: arr
                }))
            } else {
                alert('网络错误,请刷新重试!');
            }
        })

    }

    render() {
        return (
            <div className="info-query-container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>员工编号</th>
                            <th>姓名</th>
                            <th>选择科室</th>
                            <th>审核通过</th>
                            <th>审核不通过</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.viewList.map((el, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{el.workNum}</td>
                                        <td>{el.name}</td>
                                        <td>
                                            <Form.Control as="select" id={"select" + index}>
                                                {config.department.map(el => {
                                                    return (
                                                        <option key={el}>{el}</option>
                                                    )
                                                })}
                                            </Form.Control>
                                        </td>
                                        <td><Button variant="primary" onClick={this.viewPassOrNot.bind(this, true, index)}>通过</Button></td>
                                        <td><Button variant="danger" onClick={this.viewPassOrNot.bind(this, false, index)}>不通过</Button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </div>
        )
    }
}