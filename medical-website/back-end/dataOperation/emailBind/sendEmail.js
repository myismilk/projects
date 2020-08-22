const nodemailer = require("nodemailer");

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
    req.session.emailBind = {
        email: data.email,
        code: randStr
    };
    let toEmail = data.email;
    var sendHtml = "<div><p>您此次邮箱绑定的验证码为：" + randStr + "</p></div>";
    var mailOptions = {
        // 发送邮件的地址
        from: '1751550857@qq.com',
        // 接收邮件的地址
        to: toEmail,
        // 邮件主题
        subject: '大白菜健康中心邮箱绑定验证码',
        // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
        html: sendHtml
    };
    // 发送邮件，并有回调函数
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            resolve(JSON.stringify({
                message: '验证码获取失败，请刷新后重试!'
            }))
            return ;
        }
        resolve(JSON.stringify({
            message: '验证码已发送，请到邮箱中查看!'
        }))
    });
}

module.exports = {
    sendEmail
}