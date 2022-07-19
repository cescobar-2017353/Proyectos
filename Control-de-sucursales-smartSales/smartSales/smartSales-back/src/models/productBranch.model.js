'use strict'

const mongoose = require('mongoose');

const productBranchSchema = mongoose.Schema({
    
    stock: Number,
    totalSales: Number,
    productCompany:{type: mongoose.Schema.ObjectId, ref:'ProductCompany'},
    branch:{type: mongoose.Schema.ObjectId, ref:'Branch'}
    
});

module.exports = mongoose.model('ProductBranch', productBranchSchema);