var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    User = require('../modules/user.js');

router.get('/', function(req, res, next) {
    res.render('reg', { title: 'KFs blog' });
});


router.post('/', function (req, res) {
    var name = req.body.name,
        password = req.body.password;
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: name,
        password: password,
        email: req.body.email
    });
    //检查用户名是否已经存在
    User.get(newUser.name, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (user) {
            req.flash('error', '用户已存在!');
            return res.redirect('/reg');//返回注册页
        }
        //如果不存在则新增用户
        newUser.save(function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('reg');//注册失败返回主册页
            }
            req.flash('success', '注册成功!');
            res.redirect('/');//注册成功后返回主页
        });
    });
});

module.exports = router;