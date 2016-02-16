var express = require('express');
var router = express.Router();
var User = require('../modules/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '主页',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString() });
});

module.exports = router;
