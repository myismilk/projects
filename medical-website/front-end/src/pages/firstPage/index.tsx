import React from 'react';
import Login from './login';
import Announcement from './announcement';
import Tips from './tips';
import './index.less'

interface state {
    logined: boolean;
}

export default class firstPage extends React.Component<{}, state>{
    constructor(props: {}) {
        super(props);
        this.state = {
            logined: false
        }
    }

    handleClick = () => {
        this.setState(() => ({
            logined: true
        }))
    }

    render() {
        
        return (
            <div className="firstPage-container">
                <div className="leftContainer">
                    <div className="announcement">
                        <Announcement />
                    </div>
                    <div className="healthyTips">
                        <Tips />
                    </div>
                </div>
                <div className="loginContainer">
                    <Login />
                </div>
            </div>
        );
    }
}