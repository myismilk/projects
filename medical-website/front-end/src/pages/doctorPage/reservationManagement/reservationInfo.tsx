import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.less';
import { config } from '../../../globalConfig';

interface props {
    reservationList: any[];
    time: string;
}

interface state {
    reservationList: any[];
    reservationListDetail: any[];
}

export default class page extends React.Component<props, state> {

    constructor(props: props) {
        super(props);
        this.state = {
            reservationList: this.props.reservationList,
            reservationListDetail: []
        }
    }

    componentWillReceiveProps(state: any) {
        let promise = new Promise((resolve, reject) => {

            resolve();
        }).then(() => {
            fetch(config.domain + "doctorGetReservationList", {
                method: 'POST',
                body: JSON.stringify({
                    time: this.props.time
                })
            }).then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            }).then(val => {
                this.setState(() => ({
                    reservationList: val
                }))
            })
        })
    }

    reservationDone = (index: number) => {
        let content = this.state.reservationList[index];
        let id = content.id;

        fetch(config.domain + "reservationDone", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                reservationId: id
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            if (val.message === 'succeed') {
                //this.state.reservationList[index].isDone
                let arr = this.state.reservationList;
                arr[index].isDone = 1;
                this.setState(() => ({
                    reservationList: arr
                }))
            }else{
                alert('网络错误,请刷新后重试!');
            }
        })
    }

    render() {
        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>患者身份证</th>
                            <th>患者</th>
                            <th>确认预约完成</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reservationList.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el.idNum}</td>
                                    <td>{el.name}</td>
                                    <td>
                                        {this.state.reservationList[index].isDone === 0 ?
                                            (<Button variant="primary" onClick={() => this.reservationDone(index)}>预约完成</Button>)
                                            :
                                            (<Button variant="danger" disabled>预约已完成</Button>)
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )
    }
}