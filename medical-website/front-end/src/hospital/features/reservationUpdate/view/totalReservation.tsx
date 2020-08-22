import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.less';
import { config } from '../../../../globalConfig';

interface props {
    reservationList: any[];
    department: string;
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
            this.setState(() => ({
                reservationList: state.reservationList
            }));
            resolve();
        }).then(() => {
            fetch(config.domain + "hosGetReservationListDetail", {
                method: 'POST',
                body: JSON.stringify({
                    department: this.props.department,
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
                    reservationListDetail: val
                }))
            })
        })
    }

    render() {
        return (
            <>
                <Link to={{
                    pathname: "/hospital/details",
                    state: { reservationListDetail: this.state.reservationListDetail, content: '内容' }
                }}
                    className="total-to-detail"
                >
                    点击查看详细预约数据
                </Link>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>医生编号</th>
                            <th>医生姓名</th>
                            <th>已预约数量</th>
                            <th>可预约总数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reservationList.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el.workNum}</td>
                                    <td>{el.name}</td>
                                    <td>{el.count}</td>
                                    <td>{el.maxDay}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )
    }
}