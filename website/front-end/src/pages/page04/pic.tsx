import React, { useState } from 'react';
import chenhui from '../../img/chenhui.jpg';
import store from '../../redux/store';
import './pic.css';


export default function Pic() {
    return (
        <div className="page04-picContainer">
            <img
                src={''}
                className="page04-pic"
                data-src={chenhui}
            />
        </div>
    )
}