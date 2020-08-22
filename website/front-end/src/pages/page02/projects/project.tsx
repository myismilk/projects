import React from 'react';
import Back from '../back/back';
import './project.css';
import '../sort.css';
import projectImg from '../../../img/rent.jpg';
import chatRoom from '../../../img/chatRoom.jpg';
import bank from '../../../img/bank.jpg';


export default class project extends React.Component {
    toPage = (url: string) => {
        window.open(url);
    }
    render() {
        return (
            <div className="page02-projects" id="show-page-02" style={{ opacity: 0 }}>
                <Back id={"show-page-02"} />
                <div className="page02-projects-card" onClick={this.toPage.bind(this, "http://www.huajiyang.com:7000/rent/login.html")}>
                    <img
                        src={''}
                        data-src={projectImg}
                    />
                    <p>cabbage房屋出租中心</p>
                </div>

                <div className="page02-projects-card" onClick={this.toPage.bind(this,"http://www.huajiyang.com:7000/chatRoom/login.html")}>
                    <img
                        src={''}
                        data-src={chatRoom}
                    />
                    <p>cabbage聊天室</p>
                </div>

                <div className="page02-projects-card" onClick={this.toPage.bind(this,"https://github.com/cabbageych/projects/tree/master/bank(swing)")}>
                    <img
                        src={''}
                        data-src={bank}
                    />
                    <p>银行管理系统（swing界面）</p>
                </div>
            </div>
        )
    }
}