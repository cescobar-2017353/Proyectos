'use strict'

const express = require('express');
const productBranchController = require('../controllers/productBranch.controller');
const mdAuth = require('../services/authenticated');
const api = express.Router();

api.post('/addProductBranch', mdAuth.ensureAuth1, productBranchController.addProductBranch);
api.post('/addSale/:id', mdAuth.ensureAuth1, productBranchController.addSale);
api.get('/getProductsBranch/:id', mdAuth.ensureAuth1, productBranchController.getProductsBranch);
api.get('/getProductsBranch2/:id', mdAuth.ensureAuth1, productBranchController.getProductsBranch2);

api.get('/getProductBranch/:idProduct', mdAuth.ensureAuth1, productBranchController.getProductBranch)
module.exports = api;