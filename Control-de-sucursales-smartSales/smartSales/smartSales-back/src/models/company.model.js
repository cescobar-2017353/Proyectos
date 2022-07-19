'use strict'

const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    name: String,
    type: String,
    username: String,
    password: String,
    role: String
});

module.exports = mongoose.model('Company', companySchema);