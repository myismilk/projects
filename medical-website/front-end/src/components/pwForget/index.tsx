import React from 'react';
import Title from '../../components/header/index';
import PwReset from './pwReset';
import './index.less';

export default class info extends React.Component {
    render() {
        return (
            <div className="pw-forget-container">
                <div className="header">
                    <Title content="密码找回" />
                </div>
                <div className="info-body">
                   <PwReset />
                </div>
            </div>
        )
    }
}