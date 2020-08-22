const getMessages = require('../dataOperation/getMessages').getMessages;
const getMaxPage = require('../dataOperation/getMaxPage').getMaxPage;
const uploadMes = require('../dataOperation/uploadMes').uploadMes;

router = (app, dir) => {
    //静态资源根路径
    resourcePath = dir + '/public/';

    app.post('/getMessages', (req, res) => {
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            let page = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                getMessages(page.pageNum, resolve);
            });
            promise.then(messages => {
                //将数据库中取出的结果放到数组中
                let mesArr = [];
                for (let i = 0, len = messages.length; i < len; i++) {
                    mesArr[i] = {
                        name: messages[i].name,
                        content: messages[i].content,
                        floorNumber: messages[i].floorNumber,
                    }
                }
                res.writeHead(200, { 'Content-Type': "application/json" });
                res.write(JSON.stringify(mesArr));
                res.end();
            });

        })
    });

    //获取留言最大页数
    app.post('/getMaxPage', (req, res) => {
        let promise = new Promise((resolve, reject) => {
            getMaxPage(resolve);
        });
        promise.then(maxPage => {
            res.writeHead(200, { 'Content-Type': "application/json" });
            res.write(JSON.stringify({ maxPage: maxPage }));
            res.end();
        });
    });

    //处理上传的留言
    app.post('/uploadMes', (req, res)=>{
        let dataContainer = '';
        let ip = req.ip || req.connection.remoteAddress || '';

        req.on('data',(message)=>{
            dataContainer += message;
        });
        req.on('end',() => {
            let content = JSON.parse(dataContainer).content;

            let promise = new Promise((resolve, reject) => {
                uploadMes(resolve, reject, ip, content);
            });
            promise.then(()=>{
                res.status(200); //上传成功返回200
                res.end();
            },()=>{ //上传失败返回500
                res.status(500);
                res.end();
            })
        })
        
    })
}

module.exports = {
    router
}