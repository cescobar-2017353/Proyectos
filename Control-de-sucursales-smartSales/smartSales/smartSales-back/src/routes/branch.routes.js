'use strict'

const express = require('express');
const branchController = require('../controllers/branch.controller');
const mdAuth = require('../services/authenticated');

const api = express.Router();

api.post('/addBranch', [mdAuth.ensureAuth1], branchController.addBranch);
api.put('/updateBranch/:id', [mdAuth.ensureAuth1], branchController.updateBranch);
api.get('/getBranchs', [mdAuth.ensureAuth1], branchController.getBranchs);
api.get('/getBranch/:id', [mdAuth.ensureAuth1], branchController.getBranch);
api.delete('/deleteBranch/:id', [mdAuth.ensureAuth1], branchController.deleteBranch);

api.get('/getBranchByAdmin/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], branchController.getBranchByAdmin);

module.exports = api;