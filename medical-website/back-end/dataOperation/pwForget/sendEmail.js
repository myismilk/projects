const nodemailer = require("nodemailer");
const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

// 定义邮件服务器服，个人建议使用QQ邮箱，用Yeah(网易)邮箱配置出现各种问题
var transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    service: 'qq',
    secure: true,
    // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
    auth: {
        user: '1751550857@qq.com',
        pass: 'mfoywewwajrciehd'
    }
});

sendEmail = (data, resolve, req) => {
    //邮箱绑定用的验证码
    let randStr = '';
    for (let i = 0; i < 6; i++) {
        randStr += Math.floor(Math.random() * 9).toString();
    }
    //console.log(data,randStr);
    let toEmail = data.email;
    var sendHtml = "<div><p>您此次找回密码的验证码为：" + randStr + "</p></div>";
    var mailOptions = {
        // 发送邮件的地址
        from: '1751550857@qq.com',
        // 接收邮件的地址
        to: toEmail,
        // 邮件主题
        subject: '大白菜健康中心密码修改验证码',
        // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
        html: sendHtml
    };

    let sql = "select * from " + data.identity + " where email=\'" + data.email + "\' and account=\'" + data.account + "\'";
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            resolve(JSON.stringify({
                message: '邮箱和账号输入有误，请确认后重新输入!'
            }))
            return;
        }
        if (result.length === 0) {
            resolve(JSON.stringify({
                message: '请重新确认账号是否已经绑定邮箱或者账号邮箱是否输入正确!'
            }))
            return;
        }
        // 发送邮件，并有回调函数
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(JSON.stringify({
                    message: '验证码获取失败，请刷新后重试!'
                }))
                return;
            }
            req.session.pwReset = {
                identity: data.identity,
                account: data.account,
                email: data.email,
                code: randStr
            };
            resolve(JSON.stringify({
                message: '验证码已发送，请到邮箱中查看!'
            }))
        });
    })
}

module.exports = {
    sendEmail
}