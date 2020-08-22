import React from 'react';
import { Card } from 'react-bootstrap';

interface props {
    content: string;
}

interface state {
    content: string;
}

export default class tip extends React.Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            content: this.props.content
        }
    }
    render() {
        return (
            <>
                <Card.Title>公告标题</Card.Title>
                <Card.Text>公告内容</Card.Text>
            </>
        )
    }
}