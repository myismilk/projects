import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Title from '../../components/header/index';
import './index.less';
import { Link } from 'react-router-dom';
import { config } from '../../globalConfig';

interface props {
    location: any;
}

interface state {
    commentList: any[];
}

export default class feature extends React.Component<props, state>{
    hosId: number | undefined = undefined;
    constructor(props: props) {
        super(props);
        this.state = {
            commentList: []
        }
    }

    getCommentList = () => {
        fetch(config.domain + "userGetCommentList", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                hosId: this.hosId
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                alert('网络错误,请刷新后重试!');
                throw new Error(res.statusText);
            }
        }).then(val => {
            //console.log(val);
            this.setState(() => ({
                commentList: val
            }))
        })
    }
    componentWillMount() {
        let state = this.props.location.state;
        this.hosId = state.hosId;
        this.getCommentList();
    }
    render() {
        return (
            <div className="user-comment-container">
                <div className="header">
                    <Title content="医院评论" />
                    <Link to="/chooseHos" className="return">返回</Link>
                </div>
                <div className="body">
                    <ListGroup>
                        {this.state.commentList.map((el, index) => {
                            return (
                                <ListGroup.Item>
                                    <p>{el.content}</p>
                                    <p>用户：{el.userName} <span />时间：{el.time}<span />诊治医生：{el.doctorName}</p>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </div>
            </div>
        )
    }
}