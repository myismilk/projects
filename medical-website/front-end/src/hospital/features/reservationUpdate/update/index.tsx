import React from 'react';
import ChangeReservation from './changeReservation';
import './index.less';

export default class page extends React.Component {
    render() {
        return (
            <>
                <div className="update-body">
                    <ChangeReservation />
                </div>
            </>
        )
    }
}