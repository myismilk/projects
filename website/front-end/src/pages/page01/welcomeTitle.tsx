import React from 'react';
import './welcomeTitle.css';

export default class WelcomeTitle extends React.Component {
    mount: any;
    ctx: any;
    imageData: any;
    pos: any[] = [];
    radius: number[] = [];
    colorTemplate: string[] =['lightblue','rgb(238, 120, 41)'];
    colors: string[] = [];
    initialRadius: number[] = [1, 4];
    directions: number[] = [];
    amplitude: number = 0.06;

    init = () => {
        this.mount.height = 250;
        this.mount.width = 800;
        this.ctx = this.mount.getContext('2d');
        this.ctx.fillStyle = 'blue';
        this.ctx.font = '150px arial';

        this.ctx.fillText('Welcome!', 50, 200);
        this.imageData = this.ctx.getImageData(0, 0, this.mount.width, this.mount.height);

        //文字像素点坐标,半径,颜色,变化方向(1变大，-1变小),变化速度
        let buffer32 = new Uint32Array(this.imageData.data.buffer);
        let count = 0;
        for (let j = 0; j < this.mount.height; j += 8) {
            let radius, direction, color;

            for (let i = 0; i < this.mount.width; i += 8) {
                if (buffer32[j * this.mount.width + i]) {
                    if (++count % 2 === 0) {
                        radius = this.initialRadius[0];
                        color = this.colorTemplate[0];
                        direction = 1;
                    } else {
                        radius = this.initialRadius[1];
                        color = this.colorTemplate[1];
                        direction = -1;
                    }
                    this.pos.push([i, j]);
                    this.radius.push(radius);
                    this.colors.push(color);
                    this.directions.push(direction);
                }
            }
        }
        
        //图像闪烁
        this.animate();
    }

    drawArc = (x: number, y: number, i: number) => {
        this.ctx.save();
        this.ctx.fillStyle = this.colors[i];
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.radius[i], Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.restore();
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.mount.width, this.mount.height);
        for (let i = 0; i < this.pos.length; i++) {
            //this.colors[i] = this.getColor();
            if (this.directions[i] === 1) {
                this.radius[i] += this.amplitude;
                this.colors[i] = this.colorTemplate[0];
                if (this.radius[i] >= this.initialRadius[1]) {
                    this.directions[i] = -1;   
                }
            } else {
                this.radius[i] -= this.amplitude;
                this.colors[i] = this.colorTemplate[1];
                if (this.radius[i] <= this.initialRadius[0]) {
                    this.directions[i] = 1;
                }
            }
        }
        for (let i = 0; i < this.pos.length; i++) {
            //绘制小圆点
            this.drawArc(this.pos[i][0], this.pos[i][1], i);
        }
        requestAnimationFrame(this.animate);
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return (
            <canvas className="welcomeTitle" ref={r => this.mount = r}></canvas>
        )
    }
}