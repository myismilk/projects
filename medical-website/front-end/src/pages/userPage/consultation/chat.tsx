import React from 'react';
import { Button } from 'react-bootstrap';
import { config } from '../../../globalConfig';
import PopUp from '../../../components/popUp';

interface msgList {
    doctorId: number;
    name: string;
    firstAdd: boolean;
    msg: any[];
}

interface props {
    doctor: any;
}

interface state {
    contactList: any[];
    selectedDoctor: number;
    popUp: boolean;
    content: string;
    msgList: msgList[];
}

export default class chat extends React.Component<props, state> {
    ws: any;
    toDoctorId: number | undefined = undefined;
    toDoctorName: string = '';
    msg: string = '';
    textRef: any;

    constructor(props: props) {
        super(props);
        this.state = {
            popUp: false,
            content: '',
            contactList: [],
            selectedDoctor: 0,
            msgList: []
        }
    }

    setContactListAndMsgList = (doctor: any[]) => {
        let doctor02: any = {};
        let list = this.state.contactList;
        let list02 = this.state.msgList;
        if (list.length === 0) {
            this.toDoctorId = doctor[0].doctorId;
            this.toDoctorName = doctor[0].name;
        }
        for (let j = 0; j < doctor.length; j++) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].doctorId === doctor[j].doctorId) {
                    doctor.splice(j, 1);
                    --j;
                    break;
                }
            }
        }
        if (doctor.length === 0) {
            return;
        }
        //console.log()
        for (let i = 0; i < doctor.length; i++) {
            doctor02.doctorId = doctor[i].doctorId;
            doctor02.name = doctor[i].name;
            doctor02.firstAdd = true;
            doctor02.msg = [];
            list.push(doctor[i]);
            list02.push(doctor02);
            doctor02 = {};
        }

        this.setState(() => ({
            popUp: false,
            contactList: list,
            msgList: list02
        }))
    }

    componentWillReceiveProps(state: any) {
        this.setState(() => ({
            popUp: false,
        }))
        if (state.doctor.name !== undefined && this.props.doctor.doctorId !== state.doctor.doctorId) {
            let doctor = state.doctor;
            this.setContactListAndMsgList([doctor]);
        }
    }

    //首次加载获取全部聊天信息
    getAllMsg = (index: number) => {
        let doctorId = this.state.msgList[index].doctorId;
        fetch(config.domain + "userGetAllMsg", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                doctorId: doctorId
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

    changeSelectedDoctor = (index: number) => {
        this.toDoctorId = this.state.contactList[index].doctorId;
        this.toDoctorName = this.state.contactList[index].name;
        this.setState(() => ({
            popUp: false,
            selectedDoctor: index
        }));
        //首次加载获取全部聊天信息
        if (this.state.msgList[index].firstAdd) {
            this.getAllMsg(index);
            this.state.msgList[index].firstAdd = false;
        }
    }

    getHistoryContactList = () => {
        fetch(config.domain + 'userGetContactList', {
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
        this.ws = new WebSocket('ws://localhost/chat/msgToDoctor');
        this.ws.addEventListener('open', function (event: any) {
            console.log('socket is open');
        });

        this.ws.addEventListener('message', function (event: any) {
            let data = JSON.parse(event.data);
            if (data.msgType === 'msgToServer') {
                if (data.status === 'succeed') {
                    let doctorId = data.doctorId;
                    let msg = data.msg;
                    let arr = _this.state.msgList;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].doctorId === doctorId) {
                            arr[i].msg.push({
                                msg: msg,
                                msgFrom: 'user'
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
                    if (arr[i].doctorId === data.doctorId) {
                        arr[i].msg.push({
                            msg: data.msg,
                            msgFrom: 'doctor'
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
        if (this.toDoctorId === undefined) {
            this.setState(() => ({
                popUp: true,
                content: '还未选定需要咨询的医生!'
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
            doctorId: this.toDoctorId,
            name: this.toDoctorName,
            msg: this.msg
        }))
        this.textRef.value = '';
    }

    render() {
        return (
            <>
                {this.state.popUp ? (<PopUp content={this.state.content} />) : ''}
                <div className="left">
                    <p className="title">交流列表</p>
                    {this.state.contactList.map((el, index) => {
                        return (
                            <p
                                style={this.state.selectedDoctor === index ? ({ background: 'rgb(47, 231, 231)' }) : ({})}
                                onClick={this.changeSelectedDoctor.bind(this, index)}
                            >
                                {el.name}
                            </p>
                        )
                    })}
                </div>
                <div className="right">
                    <div className="chat-body">
                        {this.state.msgList[this.state.selectedDoctor] ?
                            (this.state.msgList[this.state.selectedDoctor].msg.map((el, index) => {
                                return (
                                    <>
                                        <p><span><strong>{el.msgFrom === 'user' ? 'me' : this.state.msgList[this.state.selectedDoctor].name}:</strong>&nbsp;&nbsp;{el.msg}</span></p>
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