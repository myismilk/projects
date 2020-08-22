import React from 'react';
import Title from '../../components/header/index';
import InfoQuery from './infoQuery/index';
import Reservation from './reservation/index';
import Consultation from './consultation/index';
import { Button, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.less';

export default class page extends React.Component {
    render() {
        return (
            <div className="user-page-container">
                <div className="header">
                    <Title content="普通用户" />
                    <span className="to-info"><Link to="/pwSet" target="__blank">安全设置</Link></span>
                    <span className="to-hospitals"><Link to="/chooseHos">返回</Link></span>
                </div>
                <div className="user-page-body">
                    <Tabs className="container" defaultActiveKey="key1" id="uncontrolled-tab-example">
                        <Tab eventKey="key1" title="预约挂号">
                            <Reservation />
                        </Tab>
                        <Tab eventKey="key2" title="咨询医生">
                            <Consultation />
                        </Tab>
                        <Tab eventKey="key3" title="查看检查结果">
                            <InfoQuery />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}