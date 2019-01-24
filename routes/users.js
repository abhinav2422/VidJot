const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', (req, res) => {
    var errors = [];

    if(req.body.password != req.body.password2){
        errors.push({text: 'Passwords do not match'});
    }
    if(req.body.password.length < 4){
        errors.push({text: 'Password must be at least 4 characters'});
    }

    if(errors.length > 0){
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email
        });
    } else{
        res.send('eaf');
    }
});

module.exports = router;