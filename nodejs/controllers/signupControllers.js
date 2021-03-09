const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { signup } = require('../models/signup');



router.get('/', (req,res)=>{
    signup.find((err,docs) => {
        if (!err) {res.send(docs);}
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    signup.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving details :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var sig = new signup({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }); 
    sig.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            res.status(500).send({message:err.message,success:false});
            console.log('Error in Signup Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var sig = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };   
    signup.findByIdAndUpdate(req.params.id,{$set:sig},{new:true}, (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in signup update:'+JSON.stringify(err, undefined, 2));}
    });
});

router.delete('/:id', (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id:${req.params.id}`);
    
    signup.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in signup delete:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;