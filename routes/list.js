/**
 * Created by haines on 16/4/20.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('list',{
        title:'List',
        items:[1991,'vbird','express','node.js']
    });
});

module.exports=router;