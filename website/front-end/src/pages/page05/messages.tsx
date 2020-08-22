import React from 'react';
import { url } from '../../urlConfig';
import './messages.css';

interface state {
    mesArr: any;
    page: number;
}

interface props {
    page: number;
}

export default class messages extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            page: 1,
            mesArr: []
        }
    }

    updateMes = (page: number) => {
        fetch(url.domainName + "getMessages", {
            method: 'POST',
            body: JSON.stringify({ pageNum: page })
        }).then((res) => {
            if (res.status >= 200 && res.status < 300 || res.status === 304) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then((val) => {
            //console.log(val);
            this.setState({
                mesArr: val
            });
        })
    }

    componentWillReceiveProps(props: props) {
        this.setState(() => {
            this.updateMes(props.page);
            return { page: props.page }
        });
    }

    componentDidMount() {
        this.updateMes(1);
    }
    render() {
        return (
            <div className="page05-messages">
                {
                    this.state.mesArr.map((el: any, index: number) => {
                        return (
                            <div key={el.floorNumber}>
                                <p>
                                    {el.floorNumber}楼
                                    <br />
                                    {el.name}
                                </p>
                                <p>{el.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}