import React from 'react';
import Choose from './choose';
import TotalReservation from './totalReservation';
import './index.less';

interface state {
    reservationList: any[];
    department: string;
    time: string;
}

export default class page extends React.Component<{}, state> {
    constructor(props: {}) {
        super(props);
        this.state = {
            reservationList: [],
            department: '',
            time: ''
        }
    }

    setReservationList = (arr: any[], depart: string, time: string) => {
        this.setState(() => ({
            reservationList: arr,
            department: depart,
            time: time
        }))
    }

    render() {
        return (
            <>
                <div className="view-header">
                    <Choose setReservationList={this.setReservationList} />
                </div>
                <div className="view-body">
                    <TotalReservation
                        reservationList={this.state.reservationList}
                        department={this.state.department}
                        time={this.state.time}
                    />
                </div>
            </>
        )
    }
}