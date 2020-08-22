import React from 'react';
import Title from '../../components/header/index';
import { Tabs, Tab } from 'react-bootstrap';
import InfoUpdate from './infoUpdate/index';
import Comment from './comment/index';
import ReservationUpdate from './reservationUpdate/index';
import Upload from './upload/index';
import Review from './review/index';
import './index.less';
import { Link } from 'react-router-dom';

export default class features extends React.Component {
    render() {
        return (
            <div className="features-container">
                <div className="header">
                    <Title content="医院" />
                    <span style={{
                        fontSize: '20px',
                        marginLeft: '400px'
                    }}><Link to="/hosPwSet" target="__blank">安全设置</Link> </span>
                </div>
                <div className="body">
                    <Tabs defaultActiveKey="key1" id="uncontrolled-tab-example" className="features-container">
                        <Tab className="feature" eventKey="key1" title="挂号预约">
                            <ReservationUpdate />
                        </Tab>
                        <Tab className="feature" eventKey="key2" title="审核医生注册信息">
                            <Review />
                        </Tab>
                        <Tab className="feature" eventKey="key3" title="上传患者检查结果">
                            <Upload />
                        </Tab>
                        <Tab className="feature" eventKey="key4" title="修改医院介绍">
                            <InfoUpdate />
                        </Tab>
                        <Tab className="feature" eventKey="key5" title="查看评论">
                            <Comment />
                        </Tab>
                    </Tabs>
                </div>
            </div >
        )
    }
}