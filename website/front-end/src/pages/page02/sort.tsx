import React from 'react';
import './sort.css';
import projectImg from '../../img/rent.jpg';
import chatroomSocket from '../../img/chatRoomWithWebSocket.png';

export default class project extends React.Component {
    mount: any;
    showPage = (id: string) => {
        let dom = document.getElementById(id);
        if (dom) {
            dom.style.opacity = '1';
            dom.style.zIndex = '1';
        }

        this.mount.style.opacity = '0';
        this.mount.style.zIndex = '0';
    }

    render() {
        return (
            <div className="page02-projects" id="show-page-01" ref={r => this.mount = r} style={{ zIndex: 1 }}>
                <div className="page02-projects-card" onClick={this.showPage.bind(this, 'show-page-02')}>
                    <img
                        src={''}
                        data-src={projectImg}
                    />
                    <p>项目</p>
                </div>
                <div className="page02-projects-card" onClick={this.showPage.bind(this, 'show-page-03')}>
                    <img
                        src={''}
                        data-src={chatroomSocket}
                    />
                    <p>一些简单demos</p>
                </div>
            </div>
        )
    }
}