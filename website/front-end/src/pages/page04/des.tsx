import React from 'react';
import './des.css';

export default class Des extends React.Component{
    render(){
        return(
            <div className="page04-des">
                <span className="page04-btn"/>
                <p><span>姓名:&nbsp;</span>晨辉</p>
                <p><span>学校:&nbsp;</span>西安电子科技大学</p>
                <p><span>专业:&nbsp;</span>软件工程</p>
                <p><span>当前学习:&nbsp;</span>前端开发</p>
                <p><span>E-mail:&nbsp;</span>cabbagey@qq.com</p>
                <p><span>说点啥:&nbsp;</span>世上本无事，庸人自扰之</p>
                <p><span>更新于:&nbsp;</span>2020.1.31</p>
            </div>
        )
    }
}