let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
//console.log(clientWidth,clientHeight);
let canvas = document.getElementById('myCanvas');
canvas.height = clientHeight;
canvas.width = clientWidth;


function getColor() {
    return 'rgb(' + 255 * Math.random() + "," + 255 * Math.random() + "," + 255 * Math.random() + ")";
}

//存储每个圆的原点坐标,最大半径长度,背景颜色
var points = [];
for (let i = 0; i < 60; i++) {
    let x = Math.random() * clientWidth;
    let y = Math.random() * clientHeight;
    let radius = Math.random() * 50 + 10;
    let color = getColor();
    let temp = {x: x, y: y, radius: radius, color: color};
    points.push(temp);
}


//记录当前每个圆的半径长度
var lenRecord = [];
for (let i = 0; i < points.length; i++) {
    lenRecord[i] = points[i].radius * Math.random();
}
console.log(lenRecord);
//console.log(points);
canvas.style.background = 'lightyellow';
var ctx = canvas.getContext("2d");//获取上下文环境

function draw() {
    //console.log("test");
    for (let i = 0; i < points.length; i++) {
        let tag = false;
        if (lenRecord[i] <= points[i].radius) {
            lenRecord[i] += 0.1;
        } else {
            tag = true;
            lenRecord[i] = 0;
        }
        //console.log(lenRecord[i],points[i].radius);
        ctx.beginPath();
        if (tag) {
            ctx.fillStyle = 'lightyellow';
        } else {
            ctx.fillStyle = points[i].color;
        }

        if (tag) {
            ctx.arc(points[i].x, points[i].y, points[i].radius + 5, 0, Math.PI * 2);
        } else {
            ctx.arc(points[i].x, points[i].y, lenRecord[i], 0, Math.PI * 2);
        }

        ctx.fill();
    }
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);