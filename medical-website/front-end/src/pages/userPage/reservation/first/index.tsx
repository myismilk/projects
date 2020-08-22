import React from 'react';
import Reservation from './reservation';
import './index.less';

export default class page extends React.Component{
    render(){
        return(
            <div className="first-container">
                <div className="reservation-choose">
                    <Reservation />
                </div>
            </div>
        )
    }
}