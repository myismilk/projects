import React from 'react';
import store from '../../redux/store';
import lazyLoad from './lazyLoad';
import './background.css';

interface center {
    x: number;
    y: number;
}

interface props {
    resizeCount: number;
}

export default class background extends React.Component<props,{}> {
    mount: any;
    vw: number = 800;
    vh: number = 800;
    ctx: any;
    balls: any[] = [];
    ballsNum: number = 20;
    fireColumns: number = 20;
    fireGap: number = 90;
    currentPage: number = 4;
    firstEnter: boolean = true;

    constructor(props: props) {
        super(props);
    }

    componentWillReceiveProps(props: props) {
        this.init();
    }

    init = () => {
        this.ctx = this.mount.getContext('2d');
        this.vw = document.documentElement.clientWidth;
        this.vh = document.documentElement.clientHeight;
        this.mount.height = this.vh;
        this.mount.width = this.vw;
        this.fireColumns = this.vw / this.fireGap;

        let offsetX: number = 0;
        for (let i = 0; i < this.fireColumns; i++) {
            offsetX = this.fireGap * i;
            this.balls[i] = new Array(this.ballsNum);
            for (let j = 0; j < this.ballsNum; j++) {
                this.balls[i][j] = this.addBalls(offsetX);
            }
        }
    }

    addBalls = (offsetX: number) => {
        let life = 30 + Math.random() * 30;
        return {
            speed: {
                x: -5 + Math.random() * 10,
                y: -10 + Math.random() * 10
            },
            x: offsetX,
            y: this.vh - 30,
            radius: 60 + Math.random() * 10,
            life: life,
            death: life,
            r: 255,
            g: Math.round(Math.random() * 52) + 20,
            b: 0
        }

    }

    painting = () => {
        this.ctx.globalCompositeOperation = "source-over";
        let gradient = this.ctx.createLinearGradient(0, 0, 0, this.vh);
        gradient.addColorStop(1, 'rgb(231, 111, 12)');
        gradient.addColorStop(0, 'black');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.vw, this.vh);
        this.ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < this.fireColumns; i++) {
            for (let j = 0; j < this.ballsNum; j++) {
                let p = this.balls[i][j];
                this.ctx.beginPath();
                p.opacity = Math.round(p.death / p.life * 100) / 100;
                let gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
                this.ctx.fillStyle = gradient;
                this.ctx.arc(p.x, p.y, p.radius, Math.PI * 2, false);
                this.ctx.fill();
                --p.death;
                p.radius += 0.5;
                p.x += p.speed.x;
                p.y += p.speed.y;
                if (p.death < 0 || p.radius < 0) {
                    let tempx = this.fireGap * i;
                    this.balls[i][j] = this.addBalls(tempx);
                }
            }
        }

    }

    animate = () => {
        let page = store.getState().page;
        requestAnimationFrame(this.animate);
        if (page === this.currentPage) {
            if (this.firstEnter) {
                lazyLoad();
                this.firstEnter = !this.firstEnter;
            }
            this.painting();
        }
    }

    componentDidMount() {
        this.init();
        this.animate();
    }

    render() {
        return (
            <canvas
                className="page04-canvas"
                ref={r => this.mount = r}
            />
        )
    }
}