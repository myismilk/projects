import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.less';
import './announcement.less';


export default class annoucement extends React.Component {
    toTips = (page: number) => {
        let tip: any;
        if (page === 1)
            tip = document.getElementById("announcementLink1");
        else if (page === 2)
            tip = document.getElementById("announcementLink2");
        else if (page === 3)
            tip = document.getElementById("announcementLink3");
        tip?.click();
    }
    render() {
        return (
            <div className="announcementContainer">
                <h2 className="announcement-title">公告栏</h2>
                <hr className="split-line" />
                <Link to={{
                    pathname: "/announcement",
                    state: { page: 1, content: '公告一' }
                }}
                    id="announcementLink1"
                />
                <Link to={{
                    pathname: "/announcement",
                    state: { page: 2, content: '公告二' }
                }}
                    id="announcementLink2"
                />
                <Link to={{
                    pathname: "/announcement",
                    state: { page: 3, content: '公告三' }
                }}
                    id="announcementLink3"
                />
                <ul>
                    <li><Button variant="link" onClick={this.toTips.bind(this, 1)}>公告一</Button></li>
                    <li><Button variant="link" onClick={this.toTips.bind(this, 2)}>公告二</Button></li>
                    <li><Button variant="link" onClick={this.toTips.bind(this, 3)}>公告三</Button></li>
                </ul>

            </div>
        )
    }
}