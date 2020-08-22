import React from 'react';
import './hospitals.less';
import { Navbar, Card, Form, Button, FormControl, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { config } from '../../globalConfig';

interface state {
    hospitalList: any[];
}

export default class hospitals extends React.Component<{}, state>{
    hospitalList: any[] = [];
    popoverPos: any[] = [];
    constructor(props: {}) {
        super(props);
        this.state = {
            hospitalList: []
        }
    }

    fetchData = () => {
        fetch(config.domain + "chooseHos", {
            method: 'POST',
            credentials: 'include'
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                alert('获取医院列表失败,请刷新后重试!');
                throw new Error(res.statusText);
            }
        }).then(val => {
            this.hospitalList = val;
            this.setState(() => ({
                hospitalList: val
            }))
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    setPopOverPos = (index: number, event: any) => {
        this.popoverPos[index] = {
            x: event.pageX,
            y: event.pageY
        }
    }

    popover = (index: number, event: any) => {
        return (
            <Popover id="popover-basic" style={{ position: 'absolute', top: this.popoverPos[index].y, left: this.popoverPos[index].x }}>
                <Popover.Title as="h3">{this.state.hospitalList[index].name}</Popover.Title>
                <Popover.Content style={{ textIndent: '1em' }}>
                    {this.state.hospitalList[index].des}<br /><br />
                    联系方式:{this.state.hospitalList[index].contact}
                </Popover.Content>
            </Popover>
        );
    }

    searchHos = () => {
        let dom: any = document.getElementById("search-hos");
        let hosName = dom.value.trim();
        if (hosName === '') {
            return;
        }
        let arr: any[] = [], hosList = this.hospitalList;
        for (let i = 0, len = hosList.length; i < len; i++) {
            if (hosList[i].name.indexOf(hosName) !== -1) {
                arr.push(hosList[i]);
            }
        }
        this.setState(() => ({
            hospitalList: arr
        }))
    }

    enterHos = (index: number, event: any) => {
        event.preventDefault();
        event.stopPropagation();
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
                <div className="hospitals-container">
                    <Navbar bg="light" variant="light">
                        <span className="title">已在系统中注册的医院如下(点击进入服务)</span>
                        <Form inline>
                            <FormControl id="search-hos" type="text" placeholder="输入医院名字搜索" className="mr-sm-2" />
                            <Button variant="outline-primary" onClick={this.searchHos}>搜索</Button>
                        </Form>
                    </Navbar>
                    <div className="card-region">
                        {this.state.hospitalList.map((el, index) => {
                            return (
                                <OverlayTrigger trigger="hover" placement="right" overlay={this.popover.bind(this, index)}>
                                    <Card className="card" onMouseEnter={this.setPopOverPos.bind(this, index)}>
                                        <Card.Img variant="top" src={config.domain + el.photoPath} onClick={this.enterHos.bind(this, index)} />
                                        <Card.Body className="card-body">
                                            <Card.Text className="card-text">
                                                {el.name}<span />
                                                <Link to={{
                                                    pathname: "/comment",
                                                    state: {hosId: el.hosId}
                                                }}>评论</Link>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </OverlayTrigger>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}