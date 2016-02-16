var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    User = require('../modules/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: '登录',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()});
});

router.post('/', function (req, res) {
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  User.get(req.body.name, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在!');
      return res.redirect('/login');//用户不存在则跳转到登录
    }
    if (user.password != password) {
      req.flash('error', '密码错误!');
      return res.redirect('/login');//密码错误则跳转到登录页
    }
    req.session.user = user;
    req.flash('success', '登陆成功!');
    res.redirect('/');//登陆成功后跳转到主页
  });
});

module.exports = router;
