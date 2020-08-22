const fs = require('fs');
const md5 = require('md5');  // 计算etag

let resourcePath; //静态资源路径

sendFile = (url, req, res) => {
    fs.readFile(url, (err, data) => {
        if (err) {
            sendFile(resourcePath + 'index.html', req, res);
            return;
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
        sendFile(resourcePath + 'index.html', req, res);
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