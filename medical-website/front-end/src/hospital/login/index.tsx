import React from 'react';
import Title from '../../components/header/index';
import Login from './login';
import './index.less';

export default class login extends React.Component{
    render(){
        return(
            <div className="login-container">
                <div className="header">
                    <Title content="医院登录"/>
                </div>
                <div className="body">
                    <Login />
                </div>
            </div>
        )
    }
}