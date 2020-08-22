const express = require('express');
const gRouter = require('./router/getRouter'); //处理get请求
const pRouter = require('./router/postRouter'); //处理post请求
const path = require('path');
const cookieParser = require('cookie-parser'); //使用cookie
const bodyParser = require('body-parser'); //处理post请求
const compression = require('compression'); //开启gzip压缩

let app = express();

//使用中间件
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


//设置路由
gRouter.router(app, __dirname);
pRouter.router(app, __dirname);
//定制404页面
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});



//指定监听的端口
app.set('port', 80);


//指定静态资源目录并设置浏览器缓存
//app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1000 * 60 * 60 }));


app.listen(app.get('port'), () => {
    //console.log('Express started on http://localhost:'+ app.get('port') + '; press Ctrl-C to terminate.');
})