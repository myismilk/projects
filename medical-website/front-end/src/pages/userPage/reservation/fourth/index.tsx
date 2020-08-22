import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './index.less';
import { config } from '../../../../globalConfig';
import PopUp from '../../../../components/popUp';

interface state {
    comment: string;
    reservationList: any[];
    content: string;
    popUp: boolean;
}

export default class page extends React.Component<{}, state>{
    constructor(props: {}) {
        super(props);
        this.state = {
            popUp: false,
            content: '',
            comment: '',
            reservationList: []
        }
    }

    contentChange = (event: any) => {
        let val = event.target.value.trim();
        if (val !== '') {
            this.setState(() => ({
                comment: val
            }))
        } else {
            this.setState(() => ({
                comment: ''
            }))
        }
    }

    handleComment = (index: number) => {
        if (this.state.comment !== '') {
            let temp = this.state.reservationList[index];
            let doctorId = temp.doctorId, time = temp.time;
            fetch(config.domain + "uploadComment", {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    doctorId: doctorId,
                    time: time,
                    content: this.state.comment
                })
            }).then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            }).then(val => {
                if (val.message === 'succeed') {
                    this.setState(() => ({
                        content: '评价已成功提交!',
                        popUp: true
                    }))
                }
            })
        }
    }

    getReservationList = () => {
        fetch(config.domain + 'userGetReservationListDone', {
            method: 'POST',
            credentials: 'include',
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
    }

    componentDidMount() {
        this.getReservationList();
    }

    render() {
        return (
            <>
                {this.state.popUp ? (<PopUp content={this.state.content} />) : ''}
                <div className="reservation-finished-container">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>科室</th>
                                <th>医生</th>
                                <th>时间</th>
                                <th>服务评价</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reservationList.map((el, index) => {
                                return (
                                    <tr>
                                        <td>{el.department}</td>
                                        <td>{el.doctorName}</td>
                                        <td>{el.time}</td>
                                        <td>
                                            <Form>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows={3} onChange={this.contentChange} >{el.content}</Form.Control>
                                                </Form.Group>
                                                {el.isDone === 0 ?
                                                    (<Button variant="primary" disabled>提交</Button>)
                                                    :
                                                    (<Button variant="primary" onClick={this.handleComment.bind(this, index)}>提交</Button>)
                                                }

                                            </Form>
                                        </td>
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