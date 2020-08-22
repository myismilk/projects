import React from 'react';
import './blackBoard.css';

export default class blackBoard extends React.Component {
    render() {
        return (
            <div className="page04-blackBoard">
                <div className="page04-title">写点东西</div>
                <div className="page04-list">
                    <h3>分类列表</h3>
                    <p>暂无分类</p>
                </div>
                <div className="page04-content">
                    <p><span>1、</span><a href="https://github.com/cabbageych/Blog/issues/1" target="_blank">利用阿里云创建个人网站</a></p>
                    <p><span>2、</span><a href="https://github.com/cabbageych/Blog/issues/2" target="_blank">Linux下mysql8报错mysql.infoschema不存在</a></p>
                    <p><span>3、</span><a href="https://github.com/cabbageych/Blog/issues/3" target="_blank">CSS动画(animation)属性归纳 </a></p>
                    <p><span>4、</span><a href="https://github.com/cabbageych/Blog/issues/4" target="_blank">Canvas使用（参考MDN与js高程第三版）01 </a></p>
                    <p><span>5、</span><a href="https://github.com/cabbageych/Blog/issues/5" target="_blank">Canvas使用（参考MDN与js高程第三版）02 </a></p>
                    <p><span>6、</span><a href="https://github.com/cabbageych/Blog/issues/6" target="_blank">var、let与const区别 </a></p>
                    <p><span>7、</span><a href="https://github.com/cabbageych/Blog/issues/7" target="_blank">js对DOM进行增、删、查找 </a></p>
                </div>
            </div>
        )
    }
}