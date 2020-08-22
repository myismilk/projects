import React from 'react';
import { Button } from 'react-bootstrap';
import { config } from '../../../globalConfig';
import PopUp from '../../../components/popUp';

interface msgList {
    userId: number;
    name: string;
    firstAdd: boolean;
    msg: any[];
}

interface state {
    contactList: any[];
    selectedUser: number;
    popUp: boolean;
    content: string;
    msgList: msgList[];
}

export default class chat extends React.Component<{}, state> {
    ws: any;
    toUserId: number | undefined = undefined;
    toUserName: string = '';
    msg: string = '';
    textRef: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            popUp: false,
            content: '',
            contactList: [],
            selectedUser: 0,
            msgList: []
        }
    }

    setContactListAndMsgList = (user: any[]) => {
        let user02: any = {};
        let list = this.state.contactList;
        let list02 = this.state.msgList;
        if (list.length === 0) {
            this.toUserId = user[0].userId;
            this.toUserName = user[0].name;
        }
        for (let j = 0; j < user.length; j++) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].userId === user[j].userId) {
                    user.splice(j, 1);
                    --j;
                    break;
                }
            }
        }
        if (user.length === 0) {
            return;
        }
        //console.log()
        for (let i = 0; i < user.length; i++) {
            user02.userId = user[i].userId;
            user02.name = user[i].name;
            user02.firstAdd = true;
            user02.msg = [];
            list.push(user[i]);
            list02.push(user02);
            user02 = {};
        }

        this.setState(() => ({
            popUp: false,
            contactList: list,
            msgList: list02
        }))
    }

    //首次加载获取全部聊天信息
    getAllMsg = (index: number) => {
        let userId = this.state.msgList[index].userId;
        fetch(config.domain + "doctorGetAllMsg", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                userId: userId
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                alert('网络错误,请刷新后重试!');
                throw new Error(res.statusText);
            }
        }).then(val => {
            let temp = this.state.msgList;
            temp[index].msg = val;
            this.setState(() => ({
                msgList: temp
            }))
        })
    }

    changeSelectedUser = (index: number) => {
        this.toUserId = this.state.contactList[index].userId;
        this.toUserName = this.state.contactList[index].name;
        this.setState(() => ({
            popUp: false,
            selectedUser: index
        }));
        //首次加载获取全部聊天信息
        if (this.state.msgList[index].firstAdd) {
            this.getAllMsg(index);
            this.state.msgList[index].firstAdd = false;
        }
    }

    getHistoryContactList = () => {
        fetch(config.domain + 'doctorGetContactList', {
            credentials: 'include',
            method: 'POST'
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                alert('网络错误,请刷新后重试!');
                throw new Error(res.statusText);
            }
        }).then(val => {
            this.setContactListAndMsgList(val);
        })
    }

    componentDidMount() {
        let _this = this;
        this.getHistoryContactList();
        this.ws = new WebSocket('ws://localhost/chat/msgToUser');
        this.ws.addEventListener('open', function (event: any) {
            console.log('socket is open');
        });

        this.ws.addEventListener('message', function (event: any) {
            let data = JSON.parse(event.data);
            if (data.msgType === 'msgToServer') {
                if (data.status === 'succeed') {
                    let userId = data.userId;
                    let msg = data.msg;
                    let arr = _this.state.msgList;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].userId === userId) {
                            arr[i].msg.push({
                                msg: msg,
                                msgFrom: 'doctor'
                            })
                            break;
                        }
                    }
                    _this.setState(() => ({
                        msgList: arr
                    }))
                }
            } else {
                let arr = _this.state.msgList;
                for (let i = 0, len = arr.length; i < len; i++) {
                    if (arr[i].userId === data.userId) {
                        arr[i].msg.push({
                            msg: data.msg,
                            msgFrom: 'user'
                        })
                        _this.setState(() => ({
                            msgList: arr
                        }))
                        break;
                    }
                }
            }
        });
    }

    sendMsg = () => {
        if (this.toUserId === undefined) {
            this.setState(() => ({
                popUp: true,
                content: '还未选定需要回复的患者!'
            }))
            return;
        }
        this.msg = this.textRef.value.trim();
        if (this.msg === '') {
            this.setState(() => ({
                popUp: true,
                content: '发送内容不能为空!'
            }))
        }
        this.ws.send(JSON.stringify({
            userId: this.toUserId,
            name: this.toUserName,
            msg: this.msg
        }))
        this.textRef.value = '';
    }

    render() {
        return (
            <>
                {this.state.popUp ? (<PopUp content={this.state.content} />) : ''}
                <div className="left">
                    <p className="title">患者留言列表</p>
                    {this.state.contactList.map((el, index) => {
                        return (
                            <p
                                style={this.state.selectedUser === index ? ({ background: 'rgb(47, 231, 231)' }) : ({})}
                                onClick={this.changeSelectedUser.bind(this, index)}
                            >
                                {el.name}
                            </p>
                        )
                    })}
                </div>
                <div className="right">
                    <div className="chat-body">
                        {this.state.msgList[this.state.selectedUser] ?
                            (this.state.msgList[this.state.selectedUser].msg.map((el, index) => {
                                return (
                                    <>
                                        <p><span><strong>{el.msgFrom === 'doctor' ? 'me' : this.state.msgList[this.state.selectedUser].name}:</strong>&nbsp;&nbsp;{el.msg}</span></p>
                                    </>
                                )
                            })) : ''}
                    </div>
                    <div className="chat-bottom">
                        <textarea className="input-area" ref={r => this.textRef = r}></textarea>
                        <Button variant="primary" onClick={this.sendMsg}>发送</Button>
                    </div>
                </div>
            </>
        )
    }
}