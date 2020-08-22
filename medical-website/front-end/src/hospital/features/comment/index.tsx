import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './index.less';
import { config } from '../../../globalConfig';

interface state {
    commentList: any[];
}

export default class feature extends React.Component<{}, state> {
    constructor(props: {}) {
        super(props);
        this.state = {
            commentList: []
        }
    }

    getCommentList = () => {
        fetch(config.domain + "hosGetCommentList", {
            method: 'POST',
            credentials: 'include',
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                alert('网络错误,请刷新后重试!');
                throw new Error(res.statusText);
            }
        }).then(val => {
            console.log(val);
            this.setState(() => ({
                commentList: val
            }))
        })
    }

    componentDidMount() {
        this.getCommentList();
    }
    render() {
        return (
            <div className="comment-container">
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
        )
    }
}