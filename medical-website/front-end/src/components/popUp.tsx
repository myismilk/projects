import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface state {
    show: boolean;
    content: string;
}

interface props {
    content: string;
}

export default class popUp extends React.Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            show: true,
            content: this.props.content
        }
    }

    handleClose = () => {
        this.setState(() => ({
            show: false
        }))
    }

    componentWillReceiveProps(){
        this.setState(() => ({
            show: true
        }))
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>提示</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.content}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                        确定
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}