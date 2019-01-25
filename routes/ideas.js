const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} =  require('../helpers/auth');

require('../models/Idea');
const Idea = mongoose.model('ideas');

router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find({user: req.user.id})
        .sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            if(idea.user!=req.user.id){
                req.flash('error_msg', 'Not authorised');
                res.redirect('/ideas');
            }
            else{
                res.render('ideas/edit', {
                    idea: idea
                });
            }
        });
});

router.post('/', ensureAuthenticated, (req, res) => {
    let error = [];

    if (!req.body.title) {
        error.push({ text: 'Please enter a title' });
    }
    if (!req.body.details) {
        error.push({ text: 'Please enter some details' });
    }

    if (error.length > 0) {
        res.render('ideas/add', {
            errors: error,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Idea added');
                res.redirect('/ideas');
            })
    }
});

router.put('/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            idea.title = req.body.title;
            idea.details = req.body.details;

            idea.save()
                .then(idea => {
                    req.flash('success_msg', 'Idea updated');
                    res.redirect('/ideas');
                });
        });
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
    Idea.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Idea removed');
            res.redirect('/ideas');
        });
});

module.exports = router;