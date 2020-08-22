import React from 'react';
import { Table, Button } from 'react-bootstrap';
import './index.less';
import { config } from '../../../../globalConfig';
import PopUp from '../../../../components/popUp';

interface state {
    popUp: boolean;
    content: string;
    reservationList: any[];
}

export default class page extends React.Component<{}, state> {
    constructor(props: {}) {
        super(props);
        this.state = {
            popUp: false,
            content: '',
            reservationList: [],
        }
    }

    fetchList = () => {
        fetch(config.domain + 'getReservationList', {
            method: 'POST',
            credentials: 'include'
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            //console.log(val);
            this.setState(() => ({
                reservationList: val,
            }))
        })
    }

    cancelReservation = (index: number) => {
        let list = this.state.reservationList;
        fetch(config.domain + "cancelReservation", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                id: list[index].reservationId
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            if (val.message === 'succeed') {
                list.splice(index, 1);
                this.setState(() => ({
                    popUp: true,
                    content: '预约已取消',
                    reservationList: list
                }));
            } else {
                this.setState(() => ({
                    popUp: true,
                    content: '网络故障,请刷新后重试!',
                }));
            }
        })
    }

    componentDidMount() {
        this.fetchList();
    }

    render() {
        return (
            <>
                {this.state.popUp ? (<PopUp content={this.state.content} />) : ''}
                <div className="my-reservation-container">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>科室</th>
                                <th>医生</th>
                                <th>时间</th>
                                <th>取消预约</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reservationList.map((el, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{el.department}</td>
                                        <td>{el.doctorName}</td>
                                        <td>{el.time}</td>
                                        <td><Button variant="danger" onClick={this.cancelReservation.bind(this, index)}>取消预约</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}