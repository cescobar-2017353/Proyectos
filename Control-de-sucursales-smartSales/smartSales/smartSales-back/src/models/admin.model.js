'use strict'

const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    Email: String,
    role: String
});

module.exports = mongoose.model('Admin', adminSchema);