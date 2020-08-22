import React, { SFC } from 'react';
import Background from './background';
import MessageBoard from './messageBoard';
import './index.css';

interface Props {
    store: any;
    resizeCount: number;
}

interface state {
    resizeCount: number;
}
class mainPage extends React.Component<Props, state>{
    mount: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            resizeCount: 0
        }
    }
    componentWillReceiveProps(props: Props) {
        let count = props.resizeCount;
        this.setState((state, props) => ({
            resizeCount: count + 0.00001
        }))
    }
    render() {
        return (
            <div
                className="mainPage page05"
                ref={r => this.mount = r}
            >
                <Background resizeCount={this.state.resizeCount} />
                <MessageBoard />
            </div>
        )
    }
}


export default mainPage;