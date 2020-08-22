import React, { SFC } from 'react';
import Background from './background';
import BlackBoard from './blackBoard';
import './index.css';

interface Props{
    store:any
}

interface state{
}
class mainPage extends React.Component<Props,state>{
    constructor(props:Props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        return (
            <div className="mainPage page03">
                <Background />
                <BlackBoard />
            </div>
        )
    }
}


export default mainPage;