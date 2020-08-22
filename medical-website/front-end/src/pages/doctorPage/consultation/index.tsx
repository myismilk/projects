import React from 'react';
import Chat from './chat';
import './index.less';

export default class consultation extends React.Component{

    render() {
        return (
            <div className="consultation-container">
                <div className="chat-container">
                    <Chat />
                </div>
            </div>
        )
    }
}