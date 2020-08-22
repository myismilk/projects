import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import History from './history';
import Hospitals from './hospitals';
import Title from '../../components/header/index';
import img from '../../img/smile.png';
import './index.less';

interface state {
    toInfo: boolean;
}

export default class chooseHos extends React.Component<{}, state>{
    constructor(props: {}) {
        super(props);
        this.state = {
            toInfo: false
        }
    }

    toInfo = () => {
        this.setState(() => ({
            toInfo: true
        }))
    }

    render() {
        return (
            <div className="hospitals-page">
                <div className="header">
                    <Title content="选择已注册医院进入服务"/>
                    <span className="to-info"><Link to="/pwSet" target="__blank">安全设置</Link> </span>
                </div>
                <div className="hospitals-body">
                    <div className="left-part">
                        <History />
                    </div>
                    <div className="right-part">
                        <Hospitals />
                    </div>
                </div>

            </div>
        )
    }
}