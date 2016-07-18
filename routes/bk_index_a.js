var express = require('express');
var router = express.Router();
var crypto=require('crypto');
var User=require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Express'
  });
});


router.post('/reg',function(req,res){
    var name=req.body.username,
        password=req.body.password,
        password_re=req.body['password-repeat'];

    //检测密码一致
    if(password !=password_re){
        req.flash('err','两次输入的密码不一致!');
        return res.redirect('/reg');
    }
    //生成密码的md5
    var md5=crypto.createHash('md5'),
        password=md5.update(req.body.password).digest('hex');

    var newUser=new User({
        name:name,
        password:password
    });

    //检查用户名是否存在
    User.get(newUser.name,function(err,user){
        if(err){
            req.flash('error',err);
            return res.redirect('/');
        }
        if(user){
            req.flash('error','用户已经存在!');
            return res.redirect('/reg');
        }
        //不存在则新增用户
        newUser.save(function(err,user){
            if(err){
                req.flash('error',err);
                return res.redirect('/reg');
            }
            req.session.user=newUser;//用户信息存入session
            req.flash('success','注册成功！');
            res.redirect('/');
        });
    });

});





module.exports = router;
