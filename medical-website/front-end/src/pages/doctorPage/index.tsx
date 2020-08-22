import React from 'react';
import Title from '../../components/header/index';
import Consultation from './consultation/index';
import InfoUpdate from './infoUpdate/index';
import ReservationManagement from './reservationManagement/index';
import { Button, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.less';

export default class page extends React.Component {
    render() {
        return (
            <div className="doctor-page-container">
                <div className="header">
                    <Title content="医生" />
                    <span className="to-info"><Link to="/pwSet" target="__blank">安全设置</Link> </span>
                </div>
                <div className="user-page-body">
                    <Tabs className="container" defaultActiveKey="key1" id="uncontrolled-tab-example">
                        <Tab eventKey="key1" title="患者交流">
                            <Consultation />
                        </Tab>
                        <Tab eventKey="key2" title="更新个人展示信息">
                            <InfoUpdate />
                        </Tab>
                        <Tab eventKey="key3" title="预约管理">
                            <ReservationManagement />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}