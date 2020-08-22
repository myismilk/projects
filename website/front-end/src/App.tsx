import React, { SFC } from 'react';
import PageOne from './pages/page01/index';
import PageTwo from './pages/page02/index';
import PageThr from './pages/page03/index';
import PageFou from './pages/page04/index';
import PageFiv from './pages/page05/index';
import SpinHuaji from './components/spinHuaji';
import Swipe from './components/swipeUpAndDown';
import store from './redux/store';
import { pageUp, pageDown } from './methods/pageTurning';
import SideBar from './components/sideBar';

interface state {
    resizeCount: number;
}

export default class App extends React.Component<{}, state>{
    constructor(props: {}) {
        super(props);
        this.state = {
            resizeCount: 0
        }
    }

    pageTurning: any = (function () {
        let previous: number = Number(new Date());
        return function (event: MouseWheelEvent) {
            let now: number = Number(new Date());
            if (now - previous > 1500) {
                let upORdown = event.deltaY ? event.deltaY : event.detail;
                if (!upORdown) {
                    alert('浏览器不支持滚屏!');
                    return;
                }

                if (upORdown > 0) {
                    pageDown();
                } else if (upORdown < 0) {
                    pageUp();
                }
                previous = now;
            }
        }
    })();


    componentDidMount() {
        if (navigator.userAgent.indexOf('Firefox') >= 0)
            document.addEventListener('DOMMouseScroll', this.pageTurning);
        else
            window.addEventListener("mousewheel", this.pageTurning);

        window.onresize = () => {
            let count = this.state.resizeCount;
            this.setState((state, props) => ({
                resizeCount: count + 0.00001
            }))
        }
    }

    render() {
        return (
            <div>
                <PageOne store={store} />
                <PageTwo store={store} resizeCount={this.state.resizeCount}/>
                <PageThr store={store} />
                <PageFou store={store} resizeCount={this.state.resizeCount}/>
                <PageFiv store={store} resizeCount={this.state.resizeCount}/>
                <Swipe />
                <SideBar />
                <SpinHuaji />
            </div>
        )
    }
}