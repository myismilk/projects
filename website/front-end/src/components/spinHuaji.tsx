import React from 'react';
import './spinHuaji.css';
import huaji from '../img/huaji.jpg';

export default class SpinHuaji extends React.Component {
    spineCenter: any;
    spinWrapper: any;

    mouseHover = () => {
        this.spinWrapper.style.animation = 'none';
        this.spinWrapper.style.transform = 'rotateY(60deg)';
        this.spineCenter.style.background = 'url(' + huaji + ')';
        this.spineCenter.style.backgroundSize = 'contain';
    }

    mouseOut = () => {
        this.spinWrapper.style.animation = 'rotate 16s linear infinite';
        this.spineCenter.style.background = 'radial-gradient(red, lightyellow 70%)';
    }

    render() {
        return (
            <div className="spin-huaji-wrapper">
                <div
                    className="wrapper"
                    ref={r => this.spinWrapper = r}
                    onMouseOver={this.mouseHover}
                    onMouseOut={this.mouseOut}
                >
                    <div className="inner ring01"></div>
                    <div className="inner ring02"></div>
                    <div className="inner ring03"></div>
                </div>
                <div className="spin-center" ref={r => this.spineCenter = r}></div>
            </div>
        )
    }
}