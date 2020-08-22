import React from 'react';
import Sort from './sort';
import Project from './projects/project';
import SomeDemos from './demos/someDemos';
import './demos.css';

export default class demos extends React.Component{
    
    render(){
        return(
            <div className="page02-demos">
                <Sort />
                <Project />
                <SomeDemos />
            </div>
        )
    }
}