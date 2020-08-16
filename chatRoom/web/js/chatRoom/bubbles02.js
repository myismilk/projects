function background() {
    let bubbles = [];
    let pos = [];
    let speed = [];
    let clientWidth, clientHeight;
    let bubblesNum = 7;

    function returnNum() {
        return Math.random() * 255;
    }

    function init() {
        clientHeight = document.documentElement.clientHeight;
        clientWidth = document.documentElement.clientWidth;
        for (let i = 0; i < bubblesNum; i++) {
            let div = document.createElement("div");
            div.style.zIndex = -2;
            div.className = 'wrap';
            div.id = 'ball0' + i;
            let inner = document.createElement("div");
            inner.className = 'ball';
            inner.style.background = 'rgba(' + returnNum() + ',' + returnNum() + ',' + returnNum() + ',0.5)';
            div.append(inner);
            document.body.appendChild(div);
            bubbles.push(div);
            pos[i] = { x: (clientWidth - 180) * Math.random(), y: (clientHeight - 180) * Math.random() };
            speed[i] = {x: Math.random(), y: Math.random()};
        }
        requestAnimationFrame(move);
    }


    function move() {
        for (let i = 0; i < pos.length; i++) {
            if (pos[i].x < 0 && speed[i].x < 0) {
                speed[i].x = Math.abs(speed[i].x);
                let flag = Math.random();
                if (flag > 0.5) {
                    speed[i].x += flag / 2;
                } else {
                    speed[i].x /= 2;
                }
            } else if (pos[i].x > clientWidth - 200 && speed[i].x > 0) {
                speed[i].x = -Math.abs(speed[i].x);
                let flag = Math.random();
                if (flag > 0.5) {
                    speed[i].x += -flag / 2;
                } else {
                    speed[i].x /= 2;
                }
            }

            if (pos[i].y < 0 && speed[i].y < 0) {
                speed[i].y = Math.abs(speed[i].y);
                let flag = Math.random();
                if (flag > 0.5) {
                    speed[i].y += flag / 2;
                } else {
                    speed[i].y /= 2;
                }
            } else if (pos[i].y > clientHeight - 200 && speed[i].y > 0) {
                speed[i].y = -Math.abs(speed[i].y);
                let flag = Math.random();
                if (flag > 0.5) {
                    speed[i].y += -flag / 2;
                } else {
                    speed[i].y /= 2;
                }
            }

            pos[i].x += speed[i].x;
            pos[i].y += speed[i].y;
            bubbles[i].style.left = pos[i].x + 'px';
            bubbles[i].style.top = pos[i].y + 'px';
        }

        window.onresize = function () {
            init();
        }

        requestAnimationFrame(move);
    }

    init();
}