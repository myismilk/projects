import React from 'react';
import img from '../../img/smile.png';
import './index.less';


interface props {
    content?: string;
}

interface state {
    content?: string;
}

export default class title extends React.Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            content: this.props.content,
        }
    }
    render() {
        return (
            <>
                <img src={img}></img>
                <span className="website-name">大白菜健康中心</span>
                <span className="content">{this.state.content}</span>
            </>
        )
    }
}