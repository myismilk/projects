import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './history.less';
import { config } from '../../globalConfig';

interface state {
    hospitalList: any[];
}

export default class history extends React.Component<{}, state> {
    constructor(props: {}) {
        super(props);
        this.state = {
            hospitalList: []
        }
    }

    componentDidMount() {
        fetch(config.domain + "getHistoryHosList", {
            method: 'POST',
            credentials: 'include'
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            //console.log(val);
            this.setState(() => ({
                hospitalList: val
            }))
        })
    }

    enterHos = (index: number, event: any) => {
        let toUser: any = document.getElementById('chooseHos-to-user');
        fetch(config.domain + "bindHosId", {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                hosId: this.state.hospitalList[index].hosId
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                toUser.click();
                return;
            } else {
                alert('网络错误,请重新登录!');
                throw new Error(res.statusText);
            }
        })
    }

    render() {
        return (
            <>
                <Link to="/user" id="chooseHos-to-user" />
                <div className="history-container">
                    <div className="title">
                        <p>访问历史</p>
                    </div>
                    <div className="body">
                        {this.state.hospitalList.map((el, index) => {
                            return (
                                <Card className="card" onClick={this.enterHos.bind(this, index)}>
                                    <Card.Img variant="top" src={config.domain + el.photoPath} />
                                    <Card.Body>
                                        <Card.Text>
                                            {el.name}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}