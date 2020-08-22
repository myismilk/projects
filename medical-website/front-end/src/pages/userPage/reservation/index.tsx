import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import First from './first/index';
import Second from './second/index';
import Third from './third/index';
import Fourth from './fourth/index';
import './index.less';

export default class reservation extends React.Component {
    render() {
        return (
            <div className="reservation-container">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">预约挂号</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">查看医生信息</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">我的预约</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">已完成的预约</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <First />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Second />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <Third />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <Fourth />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}