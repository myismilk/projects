function background() {
    let clientWidth;
    let clientHeight;
    let canvas = document.getElementById("myCanvas");
    let digitArr = [];
    let v = [], pos = [];
    let change = 0;
    let timer;
    canvas.style.position = 'absolute';
    canvas.style.zIndex = -1;
    ctx = canvas.getContext("2d");

    let columns;
    function init() {
        clientWidth = document.documentElement.clientWidth;
        clientHeight = document.documentElement.clientHeight;
        canvas.height = clientHeight;
        canvas.width = clientWidth;
        canvas.style.background = 'black';
        columns = Math.floor(clientWidth / 28);
        for (let i = 0; i < columns; i++) {
            let temp = [];
            v[i] = Math.random() * 10 + 10;
            for (let j = 0; j < Math.floor(Math.random() * 30) + 10; j++) {
                let charCode = Math.floor(Math.random() * 74 + 48);
                if (charCode >= 58 && charCode <= 96) {
                    charCode = 97 + Math.floor(Math.random() * 25);
                }
                temp.push(String.fromCharCode(charCode));
            }
            digitArr.push(temp);

            pos[i] = Math.random() * clientHeight;
        }

        for (let i = 0; i < columns; i++) {
            //console.log(i);

            ctx.fillStyle = 'green';
            ctx.font = "25px serif";
            ctx.fillText(digitArr[i][0], i * 28, pos[i]);
        }
        timer = setInterval(draw, 100);
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, clientWidth, clientHeight);


        ++change;
        if (change >= 3) {
            change = 0;
            for (let i = 0; i < columns; i++) {
                let temp = [];
                for (let j = 0; j < digitArr[i].length; j++) {
                    let charCode = Math.floor(Math.random() * 74 + 48);
                    if (charCode % 2 == 0) {
                        if (charCode >= 58 && charCode <= 96) {
                            charCode = 97 + Math.floor(Math.random() * 25);
                        }
                        digitArr[i][j] = String.fromCharCode(charCode);
                    }

                }
            }
        }

        for (let i = 0; i < columns; i++) {
            pos[i] += v[i];
            pos[i] = pos[i] % (clientHeight + digitArr[i].length * 20);
            for (let j = 0; j < digitArr[i].length; j++) {
                ctx.shadowColor = 'green';
                ctx.shadowOffsetX = 0.5;
                ctx.shadowOffsetY = 0;
                ctx.fillStyle = 'green';
                ctx.font = "20px serif";
                ctx.fillText(digitArr[i][j], i * 28, pos[i] - j * 20);
            }
        }
    }

    init();
    window.onresize = function () {
        clearInterval(timer);
        init();
    }
}