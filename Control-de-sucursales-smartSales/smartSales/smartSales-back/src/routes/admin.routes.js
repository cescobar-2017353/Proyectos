'use strict'

const express = require('express');
const adminController = require('../controllers/admin.controller');
const mdAuth = require('../services/authenticated');

const api = express.Router();


api.post('/registerAdmin', adminController.registerAdmin);
api.post('/login', adminController.login);

module.exports = api;