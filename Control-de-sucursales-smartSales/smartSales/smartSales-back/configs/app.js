'use strict'

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const companyRoutes = require('../src/routes/company.routes');
const adminRoutes = require('../src/routes/admin.routes');
const branchRoutes = require('../src/routes/branch.routes');
const productCompanyRoutes = require('../src/routes/productCompany.routes');
const productBranchRoutes= require('../src/routes/productBranch.routes');

const app = new express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use('/company', companyRoutes);
app.use('/admin', adminRoutes);
app.use('/branch', branchRoutes);
app.use('/productCompany', productCompanyRoutes);
app.use('/productBranch', productBranchRoutes);


module.exports = app;