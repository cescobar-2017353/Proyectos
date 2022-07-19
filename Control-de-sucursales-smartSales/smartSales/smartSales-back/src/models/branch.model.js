'use strict'

const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    name:String,
    direction:String,
    company:{type: mongoose.Schema.ObjectId, ref:'Company'}
});

module.exports = mongoose.model('Branch', branchSchema);