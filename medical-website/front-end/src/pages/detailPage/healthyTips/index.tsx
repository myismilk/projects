import React from 'react';
import Title from '../../../components/header/index';
import Tip1 from './tips1';
import Tip2 from './tips2';
import Tip3 from './tips3';
import './index.less';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

interface props {
    location: any;
}

interface state {
    page: number;
    content: string;
}

export default class pages extends React.Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            page: 1,
            content: ''
        }
    }
    componentWillMount() {
        let page = this.props.location.state.page;
        let content = this.props.location.state.content;
        if (page) {
            this.setState(() => ({
                page: page,
                content: content
            }))
        }
    }

    render() {
        return (
            <div className="health-detail-container">
                <div className="header">
                    <Title content="健康小贴士" />
                    <Link to="/" className="to-login">返回登录</Link>
                </div>
                <div className="body">
                    <Card>
                        {this.state.page === 1 ? (
                            <>
                                <Card.Header>{this.state.content}</Card.Header>
                                <Card.Body>
                                    <Tip1 content="test" />
                                </Card.Body>
                            </>) : ''
                        }
                        {this.state.page === 2 ? (
                            <>
                                <Card.Header>{this.state.content}</Card.Header>
                                <Card.Body>
                                    <Tip2 content="test" />
                                </Card.Body>
                            </>) : ''
                        }
                        {this.state.page === 3 ? (
                            <>
                                <Card.Header>{this.state.content}</Card.Header>
                                <Card.Body>
                                    <Tip3 content="test" />
                                </Card.Body>
                            </>) : ''
                        }

                    </Card>

                </div>
            </div>
        )
    }
}