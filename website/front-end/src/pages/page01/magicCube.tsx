import React from 'react';
import './magicCube.css';

export default class MagicCube extends React.Component {
    render() {
        return (
            <div>
                <div className="magicCube">
                    <div className="font"></div>
                    <div className="back"></div>
                    <div className="left"></div>
                    <div className="right"></div>
                    <div className="top"></div>
                    <div className="bottom"></div>
                </div>
                <div id="bottom"></div>
            </div>
        )
    }
}