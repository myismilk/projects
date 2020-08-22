import React from 'react';
import { Table, Button } from 'react-bootstrap';
import './index.less';
import { config } from '../../../globalConfig';

interface state {
    resultList: any[];
}

export default class page extends React.Component<{}, state>{
    constructor(props: {}) {
        super(props);
        this.state = {
            resultList: []
        }
    }

    getList = () => {
        fetch(config.domain + "userGetResultList", {
            method: 'POST',
            credentials: 'include'
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            this.setState(() => ({
                resultList: val
            }))
        })
    }

    componentDidMount() {
        this.getList();
    }
    render() {
        return (
            <div className="user-info-query-container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>标题</th>
                            <th>说明</th>
                            <th>下载</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.resultList.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el.title}</td>
                                    <td>{el.introduce}</td>
                                    <td><a href={config.domain + el.picPath} download target="__blank">下载</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}