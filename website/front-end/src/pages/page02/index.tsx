import React, { SFC } from 'react';
import Background from './background';
import Demos from './demos';
import './index.css';

interface Props {
    store: any;
    resizeCount: number;
}

interface state {
    resizeCount: number;
}
class mainPage extends React.Component<Props, state>{
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
            <div className="mainPage page02">
                <Background resizeCount={this.state.resizeCount} />
                <Demos />
            </div>
        )
    }
}


export default mainPage;