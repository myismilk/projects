import React from 'react';
import Back from '../back/back';
import './someDemos.css';
import '../sort.css';
import library from '../../../img/Library.jpg';
import chatroomSocket from '../../../img/chatRoomWithWebSocket.png';
import onlineStore from '../../../img/onlineStore.png';

export default class someDemos extends React.Component{
    toPage = (url: string) => {
        window.open(url);
    }

    render(){
        return(
            <div className="page02-projects" id="show-page-03" style={{opacity:0}}>
                <Back id={"show-page-03"}/>
                <div className="page02-projects-card" onClick={this.toPage.bind(this, "http://www.huajiyang.com:8081/index.html#/")}>
                    <img
                        src={''}
                        data-src={chatroomSocket}
                    />
                    <p>cabbage聊天室</p>
                </div>

                <div className="page02-projects-card" onClick={this.toPage.bind(this, "https://github.com/cabbageych/demo/tree/master/library")}>
                    <img
                        src={''}
                        data-src={library}
                    />
                    <p>图书馆里系统(C)</p>
                </div>

                <div className="page02-projects-card" onClick={this.toPage.bind(this, "http://www.huajiyang.com:8082/index.html#/")}>
                    <img
                        src={''}
                        data-src={onlineStore}
                    />
                    <p>在线商场商品展示</p>
                </div>
            </div>
        )
    }
}