const LocalStrategy = require('passport-local')
.Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user = mongoose.model('users');

module.exports = function(passport){

}