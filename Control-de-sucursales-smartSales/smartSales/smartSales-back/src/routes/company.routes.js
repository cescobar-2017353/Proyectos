'use strict'

const express = require('express');
const companyController = require('../controllers/company.controller');
const mdAuth = require('../services/authenticated');

const api = express.Router();

api.post('/registerCompanyByAdmin', [mdAuth.ensureAuth, mdAuth.isAdmin], companyController.registerCompanyByAdmin);
api.get('/getCompanys', [mdAuth.ensureAuth, mdAuth.isAdmin], companyController.getCompanys);
api.get('/getCompany/:id', [mdAuth.ensureAuth], companyController.getCompany);
api.put('/updateCompanyByAdmin/:id',[mdAuth.ensureAuth, mdAuth.isAdmin], companyController.updateCompanyByAdmin);
api.delete('/deleteCompanyByAdmin/:id',[mdAuth.ensureAuth, mdAuth.isAdmin], companyController.deleteCompanyByAdmin);


module.exports = api;