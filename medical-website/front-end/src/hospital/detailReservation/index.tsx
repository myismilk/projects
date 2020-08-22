import React from 'react';
import Title from '../../components/header/index';
import './index.less';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

interface props {
    location: any;
}

export default class page extends React.Component<props, {}> {
    reservationListDetail: any[] = [];
    componentWillMount() {
        console.log(this.props.location.state);
        this.reservationListDetail = this.props.location.state.reservationListDetail;
    }

    render() {
        return (
            <div className="hos-detail-container">
                <div className="header">
                    <Title content="预约详细数据" />
                    <Link to="/hospital/features" className="return-btn">返回</Link>
                </div>
                <div className="body">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>患者身份证号</th>
                                <th>医生编号</th>
                                <th>医生姓名</th>
                                <th>时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.reservationListDetail.map((el, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{el.idNum}</td>
                                        <td>{el.workNum}</td>
                                        <td>{el.name}</td>
                                        <td>{el.time}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}