const fs = require('fs');
const md5 = require('md5');  // 计算etag
const ipOperation = require('../dataOperation/ipOperation').ipOperation; //对访问的ip地址进行操作

let resourcePath; //静态资源路径

sendFile = (url, req, res) => {
    fs.readFile(url, (err, data) => {
        if (err) {
            res.status(404);
            res.type('text/plain');
            res.send('你是不是输了啥奇奇怪怪的东西。。。。。。--404 Not Found');
        } else {
            //正则匹配是否为图片
            let reg = /jpg|png|gif|jpeg|bmp/;
            //获取后缀名
            let i = url.lastIndexOf('.');
            let suffix = url.substr(i + 1, url.length);

            //设置etag
            let etag = md5(data);
            if (req.headers['if-none-match'] === etag) {
                res.status(304);
            } else {
                res.setHeader('ETag', etag);
                //判断是否为图片
                if (reg.test(suffix)) {
                    res.writeHead(200, { "Content-Type": "image/" + suffix });
                    res.write(data);
                } else {
                    res.writeHead(200, { "Content-Type": "text/" + suffix });
                    res.write(data.toString());
                }
            }
        }
        res.end();
    })
}

router = (app, dir) => {
    //静态资源根路径
    resourcePath = dir + '/public/';
    app.get('/', (req, res) => {
        //console.log(req.ip || req.connection.remoteAddress || '');
        let ip = req.ip || req.connection.remoteAddress || '';
        //使用promise实现mysql同步操作
        let promise = new Promise((resolve, reject) => {
            ipOperation(ip,resolve); //记录访问次数并返回
        });
        promise.then(count => {
            res.cookie('visitCount', count, { maxAge: 60 * 1000 });
            sendFile(resourcePath + 'index.html', req, res);
        })
    });
    app.get('/*', (req, res) => {
        let url = req.url;
        if (url === undefined || url === null) {
            return;
        } else {
            if (url.charAt(0) === '/') {
                url = url.substr(1);
            }
        }
        sendFile(resourcePath + url, req, res);
    });
}

module.exports = {
    router
}