import React from 'react';
import './back.css';

interface Props {
    id?: string;
}

export default class back extends React.Component<Props, {}>{
    showPage = () => {
        if (this.props.id !== undefined) {
            let dom = document.getElementById(this.props.id);
            if (dom) {
                dom.style.opacity = '0';
                dom.style.zIndex = '0';
            }
        }
        let dom = document.getElementById('show-page-01');
        if (dom) {
            dom.style.opacity = '1';
            dom.style.zIndex = '1';
        }
    }

    render() {
        return (
            <header className="page02-header">
                <button onClick={this.showPage}>返&nbsp;回</button>
            </header>
        )
    }
}