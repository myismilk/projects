import React, { SFC } from 'react';
import MagicCube from './magicCube';
import Welcome from './welcomeTitle';
import './index.css';

interface Props {
    store: any
}

interface state {
    visitCount: string | number;
}
class mainPage extends React.Component<Props, state>{
    constructor(props: Props) {
        super(props);
        this.state = {
            visitCount: 'null'
        }
    }

    setVisitTimes = () => {
        let name = "visitCount";
        let start = document.cookie.indexOf(name + "=");
        if (start === -1) {
            return;
        } else {
            start = start + name.length + 1;
            let end = document.cookie.indexOf(';', start);
            if (end === -1)
                end = document.cookie.length;
            let times = Number(document.cookie.substring(start, end));
            this.setState({
                visitCount: times
            })
        }

    }

    componentDidMount() {
        this.setVisitTimes();
    }
    render() {
        return (
            <div className="mainPage page01">
                <MagicCube />
                <div className="page01-rightSide">
                    <Welcome />
                    <p>这是您第<span>{this.state.visitCount}</span>次访问本站！</p>
                    <p>当前版本信息: <span>2.0</span></p>
                    <p>
                        历史版本信息:
                        <span>
                            <a className="page01-toV1" href="http://www.huajiyang.com:7000">1.0 (点击前往)</a>
                        </span>
                    </p>
                    <p>2020-1-20 -- <span>{String(new Date())}</span></p>
                    <p>
                        IPC证：
                        <span>
                            <a className="page01-toV1" href="http://www.beian.miit.gov.cn">陕ICP备19004121号-1</a>
                        </span>
                    </p>
                </div>
            </div>
        )
    }
}


export default mainPage;