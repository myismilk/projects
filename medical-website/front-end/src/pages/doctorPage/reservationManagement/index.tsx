import React from 'react';
import Choose from './chooseTime';
import ReservationInfo from './reservationInfo';
import './index.less';

interface state {
    reservationList: any[];
    time: string;
}

export default class page extends React.Component<{}, state> {
    constructor(props: {}) {
        super(props);
        this.state = {
            reservationList: [],
            time: ''
        }
    }

    setReservationList = (arr: any[], time: string) => {
        this.setState(() => ({
            reservationList: arr,
            time: time
        }))
    }

    render() {
        return (
            <>
                <div className="doctor-view-header">
                    <Choose setReservationList={this.setReservationList} />
                </div>
                <div className="doctor-view-body">
                    <ReservationInfo
                        reservationList={this.state.reservationList}
                        time={this.state.time}
                    />
                </div>
            </>
        )
    }
}