const express = require('express');
const gRouter = require('./router/getRouter'); //处理get请求
const pRouter = require('./router/postRouter'); //处理post请求
const cookieParser = require('cookie-parser'); //使用cookie
const session = require('express-session');  //使用session验证身份
const bodyParser = require('body-parser'); //处理post请求
const compression = require('compression'); //开启gzip压缩
const expressWs = require('express-ws'); //使用websocket
const chatRouter = require('./router/chatRouter/chat').router;

let app = express();
//中间件调用
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('cabbageHealthy'));
app.use(session({
    secret: 'cabbageHealthy',//与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));
//使用websocket
expressWs(app);
app.use('/chat', chatRouter);

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    //console.log(req.cookies)
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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