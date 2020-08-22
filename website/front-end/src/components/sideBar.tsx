import React from 'react';
import { toPage } from '../methods/pageTurning';
import './sideBar.css';

function showTips(page: number) {
    let container = document.getElementsByClassName('sideBar')[0];
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        if (page === i + 1) {
            children[i].className = 'pageChoose c0' + String(i + 1);
        } else {
            children[i].className = 'p0' + String(i + 1);
        }
    }
}

function hideTips(page: number) {
    let dom = document.getElementsByClassName('pageChoose c0' + String(page))[0];
    dom.className = 'p0' + String(page);
}

export default class SideBar extends React.Component {
    render() {
        return (
            <div className="sideBar">
                <div className="p01" style={{backgroundColor:'yellow'}} onClick={toPage.bind(this, 1)} onMouseOver={showTips.bind(this, 1)} onMouseLeave={hideTips.bind(this, 1)}></div>
                <div className="p02" onClick={toPage.bind(this, 2)} onMouseOver={showTips.bind(this, 2)} onMouseLeave={hideTips.bind(this, 2)}></div>
                <div className="p03" onClick={toPage.bind(this, 3)} onMouseOver={showTips.bind(this, 3)} onMouseLeave={hideTips.bind(this, 3)}></div>
                <div className="p04" onClick={toPage.bind(this, 4)} onMouseOver={showTips.bind(this, 4)} onMouseLeave={hideTips.bind(this, 4)}></div>
                <div className="p05" onClick={toPage.bind(this, 5)} onMouseOver={showTips.bind(this, 5)} onMouseLeave={hideTips.bind(this, 5)}></div>
            </div>
        )
    }
}