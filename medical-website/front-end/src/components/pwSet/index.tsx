import React from 'react';
import Title from '../../components/header/index';
import Body from './infoBody';
import Email from './email';
import './index.less';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

export default class info extends React.Component {
    render() {
        return (
            <div className="info-container">
                <div className="header">
                    <Title content="安全设置" />
                </div>
                <div className="info-body">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">密码修改</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">邮箱绑定</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <Body />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <Email />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        )
    }
}