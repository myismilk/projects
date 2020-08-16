function background(){
    //添加canvas
    let background = document.getElementsByTagName('body')[0];
    let canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = "0";
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    background.appendChild(canvas);

//初始化
    let clientWidth;
    let clientHeight;
    let points;
    let pointNum;
    let length; //线段长度的平方
    let ballColor;
    let ballRadius;
    let lineWidth;
    let ctx = canvas.getContext('2d');
    let temp = {};
    let vx; //x轴上的前进速度
    let vy; //y轴上的前进速度
    function init() {
        clientWidth = window.getComputedStyle(body)['width'];
        clientHeight = window.getComputedStyle(body)['height'];
        clientWidth = clientWidth.slice(0, clientWidth.length - 2);
        clientHeight = clientHeight.slice(0, clientHeight.length - 2);
        canvas.height = clientHeight;
        canvas.width = clientWidth;
        points = [];
        pointNum = 100;
        length = 8100; //线段长度的平方
        ballColor = 'gray';
        ballRadius = 1.5;
        lineWidth = 1;
        temp = {};
        vx = 1.5; //x轴上的前进速度
        vy = 1.5; //y轴上的前进速度
        for (let i = 0; i < pointNum; i++) {
            temp = {};
            temp.x = Math.random() * clientWidth;
            temp.y = Math.random() * clientHeight;
            temp.x = Math.floor(temp.x);
            temp.y = Math.floor(temp.y);
            temp.vx = Math.random() > 0.5 ? vx + Math.random() : -(vx + Math.random());
            temp.vy = Math.random() > 0.5 ? vy + Math.random() : -vy + Math.random();
            points.push(temp);
            ctx.beginPath();
            ctx.fillStyle = ballColor;
            ctx.arc(points[i].x, points[i].y, ballRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
//鼠标事件
    let mouse = {
        x: '',
        y: '',
        state: false
    }
    body.onmousemove = function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.state = true;
        //console.log(e);
    }
    body.onmouseleave = function () {
        mouse.state = false;
    }
    window.onresize = function(){
        init();
    }

    init();

//更新点
    function drawPoints() {
        ctx.clearRect(0, 0, clientWidth, clientHeight);
        for (let i = 0; i < points.length; i++) {
            if (points[i].x + points[i].vx > clientWidth) {
                points[i].vx = -(points[i].vx + Math.random());
            } else if (points[i].x + points[i].vx < 0) {
                points[i].vx = -(points[i].vx + Math.random());
            }
            if (points[i].y + points[i].vy > clientHeight) {
                points[i].vy = -(points[i].vy + Math.random());
            } else if (points[i].y + points[i].vy < 0) {
                points[i].vy = -(points[i].vy + Math.random());
            }
            points[i].x += points[i].vx;
            points[i].y += points[i].vy;
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, ballRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
        drawLine();
    }

//画线
    function drawLine() {
        let dist;//两点距离平方
        ctx.lineWidth = 1;
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                if (i != j) {
                    dist = (points[i].x - points[j].x) * (points[i].x - points[j].x) + (points[i].y - points[j].y) * (points[i].y - points[j].y);
                    if (dist < length) {
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.strokeStyle = 'rgba(200,150,150,' + (1 - dist / length) + ')';
                        ctx.stroke();
                    }
                }
            }
        }
        //鼠标事件
        if (mouse.state) {
            for (let i = 0; i < points.length; i++) {
                dist = (mouse.x - points[i].x) * (mouse.x - points[i].x) + (mouse.y - points[i].y) * (mouse.y - points[i].y);
                //点向鼠标靠近，加速距离范围
                if (dist < 20000 && dist > length) {
                    points[i].x += (mouse.x - points[i].x) / 10;
                    points[i].y += (mouse.y - points[i].y) / 10;
                }
                if (dist <= length) {
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(points[i].x, points[i].y);
                    ctx.strokeStyle = 'rgba(200,150,150,' + (1 - dist / length) + ')';
                    ctx.stroke();
                }
            }
        }
    }

    setInterval(drawPoints, 40);
}