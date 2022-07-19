'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

const secretKey = 'SecretKeyToExample';
const secretKey1 = 'SecretKeyToExample1';

exports.createToken = async (user) => {
    try {
        const payload = {
            sub: user._id,
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            role: user.role,
            iat: moment().unix(),
            exp: moment().add(5, 'hours').unix()
        }
        return jwt.encode(payload, secretKey);
    }catch(err) {
        console.log(err);
        return err;
    }
}

exports.createTokenCompany = async (company) => {
    try {
        const payload1 = {
            sub: company._id,
            name: company.name,
            username: company.username,
            type: company.type,
            role: company.role,
            iat: moment().unix(),
            exp: moment().add(5, 'hours').unix()
        }
        return jwt.encode(payload1, secretKey1);
    }catch(err) {
        console.log(err);
        return err;
    }
} 