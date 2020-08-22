import React from 'react';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router';
import Register from './register';
import Title from '../../components/header/index';
import './index.less';

interface state{
    toLogin: boolean;
}

export default class register extends React.Component<{},state>{
    constructor(props:{}){
        super(props);
        this.state = {
            toLogin: false
        }
    }

    toLogin = () => {
        this.setState(() => ({
            toLogin: true
        }))
    }

    render(){
        if(this.state.toLogin){
            return <Redirect to="/"></Redirect>
        }
        return(
            <div className="register-container">
                <div className="header">
                    <Title content="注册"/>
                    <span className="to-login">已有账号?<Button variant="link" onClick={this.toLogin}>立即登录</Button></span>
                </div>
                <div className="register-body">
                    <div className="ribbon"></div>
                    <Register />
                </div>
            </div>
        )
    }
}