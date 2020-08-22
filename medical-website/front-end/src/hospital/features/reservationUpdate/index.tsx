import React from 'react';
import {Row, Tab, Nav, Col} from 'react-bootstrap';
import View from './view/index';
import Update from './update/index';
import './index.less';

export default class feature extends React.Component {
    render() {
        return (
            <div className="reservation-update-container">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">查看预约信息</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">修改预约信息</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <View />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Update />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}