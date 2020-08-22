import React from 'react';
import Messages from './messages';
import './messageBoard.css';
import reducer from '../../redux/reducer';
import { url } from '../../urlConfig';

interface state {
    page: number;
    maxPage: number;
}

export default class messageBoard extends React.Component<{}, state>{
    inputRef: any;
    textareaRef: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            page: 1,
            maxPage: 5
        }
    }

    changePage = (arg: number) => {
        let page = this.state.page + arg;
        if (page <= 0 || page > this.state.maxPage) {
            return;
        }
        this.setState((state, props) => ({
            page: page
        }))
    }

    toPage = () => {
        let value = this.inputRef.value.trim();
        let reg = /^([1-9][0-9]{0,1}|100)$/;
        if (reg.test(value)) {
            let page = Number(value);
            if (page <= 0 || page > this.state.maxPage) {
                return;
            }
            this.setState((state, props) => {
                this.inputRef.value = '';
                return { page: page }
            })
        }
    }

    resetContent = () => {
        this.textareaRef.value = '';
    }

    uploadMes = () => {
        let content = this.textareaRef.value.trim();
        if (content === '') {
            alert('留言内容不能为空!');
            this.textareaRef.value = '';
            return;
        }
        fetch(url.domainName + "uploadMes", {
            method: 'POST',
            body: JSON.stringify({ content: content })
        }).then(res => {
            if (res.status >= 200 && res.status < 300 || res.status === 304) {
                alert('留言成功!刷新页面查看最新留言信息。');
                this.textareaRef.value = '';
            } else {
                alert("留言失败!");
            }
        })
    }

    componentWillMount() {
        fetch(url.domainName + "getMaxPage", {
            method: 'POST'
        }).then(res => {
            if (res.status >= 200 && res.status < 300 || res.status === 304) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            this.setState(() => ({
                maxPage: val.maxPage
            }));
        })
    }

    render() {
        return (
            <div className="page05-mb">
                <div className="page05-mb-l">
                    <div className="page05-leaveM">
                        <textarea
                            ref={r => this.textareaRef = r}
                            className="page05-leaveM-content"
                            placeholder="来都来了，随便说点啥吧！"
                        />
                        <div className="page05-leaveM-btns">
                            <button className="page05-leaveM-reset" onClick={this.resetContent}>重&nbsp;置</button>
                            <button className="page05-leaveM-leave" onClick={this.uploadMes}>留&nbsp;言</button>
                        </div>
                    </div>
                    <Messages page={this.state.page} />
                </div>
                <div className="page05-mb-r">
                    <div className="page05-buttonWrapper">
                        <button className="page05-pageButton" onClick={this.changePage.bind(this, -1)}>上一页</button>
                        <br />
                        <button className="page05-choosePage" onClick={this.toPage}>to</button>
                        <input
                            type="text"
                            className="page05-pageInput"
                            ref={r => this.inputRef = r}
                            placeholder={this.state.page + '/' + this.state.maxPage}
                        />
                        <br />
                        <button className="page05-pageButton" onClick={this.changePage.bind(this, 1)}>下一页</button>
                    </div>
                </div>
            </div>
        )
    }
}