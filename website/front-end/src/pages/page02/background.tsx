import React, { Props } from 'react';
import store from '../../redux/store';
import lazyLoad from './lazyLoad';
import './background.css';

interface props{
    resizeCount:number;
}

export default class background extends React.Component<props,{}> {
    mount: any;
    ctx: any;
    vh: number = 0;
    vw: number = 0;
    wNum: number = 16;
    hNum: number = 10;
    points: any = [];
    v: any = []; //点的移动速度
    color1: any = [];
    color2: any = [];
    colorGradientSpeed: number = 0.3; //颜色渐变速度
    cycle: number = 250;
    currentFrames: number = 0;
    cycleTimes: number = 1;
    currentPage: number = 2;
    firstEnter: boolean = true;  //用于图片懒加载

    constructor(props:props){
        super(props);
    }

    componentWillReceiveProps(props: props) {
        this.init();
    }


    init = () => {
        this.vh = document.documentElement.clientHeight;
        this.vw = document.documentElement.clientWidth;
        this.mount.height = this.vh;
        this.mount.width = this.vw;
        this.ctx = this.mount.getContext('2d');
        this.wNum = Math.ceil(this.vw / 100);
        this.hNum = Math.ceil(this.vh / 100);

        let rectH = Math.floor((this.vh) / this.hNum);
        let rectW = Math.floor((this.vw) / this.wNum);
        let count = 0;
        for (let i = 0; i < this.vh; i += rectH) {
            this.points[count] = new Array();
            if (i + rectH > this.vh) {
                //确保背景覆盖到屏幕下边界
                i = this.vh;
            }
            for (let j = 0; j < this.vw; j += rectW) {
                if (j + rectW >= this.vw) {
                    //确保背景覆盖到屏幕右边界
                    this.points[count].push([this.vw, i]);
                } else {
                    this.points[count].push([j, i]);
                }


                //初始化颜色数组
                let rand = this.rand(20, 255);
                let len = this.color1.length;
                this.color1[len] = new Array();
                this.color1[len].push(rand, 1);

                rand = this.rand(20, 255);
                len = this.color2.length;
                this.color2[len] = new Array();
                this.color2[len].push(rand, -1);
            }
            ++count;

        }

        //颜色数组
        for (let i = 1; i < this.points.length - 1; i++) {
            for (let j = 1; j < this.points[i].length - 1; j++) {
                this.points[i][j][0] += this.rand(-rectW / 3, rectW / 3);
                this.points[i][j][1] += this.rand(-rectH / 3, rectH / 3);
            }
        }
        this.initV();
    }

    initV = () => {
        let vCount = 0;
        for (let i = 0, len = this.points.length; i < len; i++) {
            for (let j = 0, len2 = this.points[i].length; j < len2; j++) {
                this.v[vCount] = new Array();
                this.v[vCount].push(this.floatRand(-0.1, 0.1), this.floatRand(-0.1, 0.1))
                ++vCount;
            }
        }
    }

    draw = () => {
        this.ctx.clearRect(0, 0, this.vw, this.vh);
        let count = 0;
        ++this.currentFrames;
        //改变x,y速度的前进方向
        if (this.currentFrames >= this.cycle) {
            this.currentFrames = 0;
            //点回到初始位置重新设置x,y方向速度
            if (this.cycleTimes % 2 === 0) {
                this.initV();
                this.cycleTimes = 0;
            }
            ++this.cycleTimes;
            for (let i = 1; i < this.points.length - 1; i++) {
                for (let j = 1; j < this.points[i].length; j++) {
                    this.v[count][0] = -this.v[count][0];
                    this.v[count][1] = -this.v[count++][1];
                }
            }
        }

        //按x,y方向速度改变点的位置
        count = 0;
        for (let i = 1; i < this.points.length - 1; i++) {
            for (let j = 1; j < this.points[i].length - 1; j++) {
                this.points[i][j][0] += this.v[count][0];
                this.points[i][j][1] += this.v[count++][1];
                //console.log(this.v[count])
            }
        }

        //颜色渐变
        for (let i = 0; i < this.color1.length; i++) {
            this.gradient(this.color1, i);
            this.gradient(this.color2, i);
        }

        //颜色填充
        this.fillTriangle(1);
        this.fillTriangle(-1);
    }

    gradient = (color: any, i: number) => {
        if (color[i][1] === -1) {
            color[i][0] -= this.colorGradientSpeed;
            if (color[i][0] <= 30)
                color[i][1] = 1;
        } else {
            color[i][0] += this.colorGradientSpeed;
            if (color[i][0] >= 255)
                color[i][1] = -1;
        }
    }

    fillTriangle = (tag: number) => {
        let count = 0;
        for (let i = 0; i < this.points.length - 1; i++) {
            for (let j = 0; j < this.points[i].length - 1; j++) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.points[i][j][0], this.points[i][j][1]);
                if (tag === 1)
                    this.ctx.lineTo(this.points[i][j + 1][0], this.points[i][j + 1][1]);
                else
                    this.ctx.lineTo(this.points[i + 1][j][0], this.points[i + 1][j][1]);
                this.ctx.lineTo(this.points[i + 1][j + 1][0], this.points[i + 1][j + 1][1]);
                if (tag === 1)
                    this.ctx.fillStyle = 'rgb(0,' + Math.floor(this.color1[count][0]) + ',' + Math.floor(this.color1[count++][0]) + ')';
                else
                    this.ctx.fillStyle = 'rgb(0,' + Math.floor(this.color2[count][0]) + ',' + Math.floor(this.color2[count++][0]) + ')';
                this.ctx.fill();
                this.ctx.strokeStyle = 'black';
                this.ctx.stroke();
            }
        }

    }

    animate = () => {
        if (this.currentPage === store.getState().page) {
            if (this.firstEnter) {
                this.firstEnter = !this.firstEnter;
                lazyLoad(this.mount.parentNode);
            }
            this.draw();
        }
        requestAnimationFrame(this.animate);
    }

    floatRand = (a: number, b?: number) => {
        if (b !== undefined) {
            if (a > b) {
                let temp = a;
                a = b;
                b = temp;
            }
            return Math.random() * (b - a) + a;
        } else {
            return Math.random() * a;
        }
    }

    rand = (a: number, b?: number) => {
        if (b !== undefined) {
            if (a > b) {
                let temp = a;
                a = b;
                b = temp;
            }
            return Math.floor(Math.random() * (b - a) + a);
        } else {
            return Math.floor(Math.random() * a);
        }
    }

    componentDidMount() {
        this.init();
        this.animate();
    }

    render() {
        return (
            <canvas
                ref={r => this.mount = r}
                className="page02-canvas"
            />
        )
    }
}