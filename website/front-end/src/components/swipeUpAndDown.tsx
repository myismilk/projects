import React, { SFC } from 'react';
import {pageUp,pageDown} from '../methods/pageTurning';
import './swipeUpAndDown.css'

function draw(ctx: any, xStart: number, xEnd: number, xMid: number, yStart: number, yEnd: number) {
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xMid, yEnd);
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.lineTo(xEnd, yStart);
    ctx.stroke();
}

export default class Swipe extends React.Component<SFC>{
    drawLine = (id: string, direction: 'up' | 'down') => {
        let canvas: any = document.getElementById(id);
        if (!canvas) return;
        canvas.height = 60;
        canvas.width = 70;
        //canvas.style.border = '5px solid red';
        let fontSize = 14;

        let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!ctx) return;
        ctx.font = fontSize + 'px sans-serif';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';

        let xStart = 5, xEnd = 65, xMid = Math.ceil((xStart + xEnd) / 2), xGap = 15;
        let yStartGap = 9, yEndGap = yStartGap + 6;
        if (direction === 'down') {
            let yStart = 40, yEnd = 55;
            for (let i = 0; i < 2; i++ , xStart += xGap, xEnd -= xGap, yStart -= yStartGap, yEnd -= yEndGap) {
                draw(ctx, xStart, xEnd, xMid, yStart, yEnd);
            }
            ctx.fillText('向下滑动', xMid - 2 * fontSize, yStart - 3);
        } else if (direction === 'up') {
            let yStart = 20, yEnd = 5;
            for (let i = 0; i < 2; i++ , xStart += xGap, xEnd -= xGap, yStart += yStartGap, yEnd += yEndGap) {
                draw(ctx, xStart, xEnd, xMid, yStart, yEnd);
            }
            ctx.fillText('向上滑动', xMid - 2 * fontSize, yStart + fontSize / 2 + 3);
        }
    }

    float = (id: string) => {
        let el = document.getElementById(id);
        let marginTop = 0;
        let direction = 'down';
        function animate() {
            let speed = 0.25;
            if (direction === 'down') {
                marginTop += speed;
            } else if (direction === 'up') {
                marginTop -= speed;
            }
            if (marginTop >= 15) {
                direction = 'up';
            }
            if (marginTop <= 0) {
                direction = 'down';
            }
            if (!el) return;
            if (id === 'canvasUp')
                el.style.marginTop = marginTop + 'px';
            else
                el.style.marginTop = -marginTop + 'px';
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    componentDidMount() {
        this.drawLine("canvasUp", 'down');
        this.drawLine("canvasDown", 'up');
        this.float("canvasUp");
        this.float("canvasDown");
    }

    render() {
        return (
            <>
                <canvas onClick={pageDown} id="canvasUp" className="myCanvas"></canvas>
                <canvas onClick={pageUp} id="canvasDown" className="myCanvas"></canvas>
            </>
        )
    }
}