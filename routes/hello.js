/**
 * Created by haines on 16/4/19.
 */
var express = require('express');
var router = express.Router();


//router.all('/',function(req,res,next){
//    console.log('all method captured!');
//    next();
//});

router.get('/', function(req, res, next) {
    res.send('The time is '+new Date().toString());
});

var users={
    'vbird':{
        name:'haines',
        website:'www.163.com'
    },
    'tom':{
        name:'rock',
        website:'www.qq.com'
    }
};
router.all('/:username',function(req,res,next){
    if(users[req.params.username]){
        next();
    }else{
        next(new Error(req.params.username+' does not exist.'));
    }
});
router.get('/:username',function(req,res){
    res.send(JSON.stringify(users[req.params.username]));
});
router.put('/:username',function(req,res){
    res.send('Done');
});




module.exports = router;
