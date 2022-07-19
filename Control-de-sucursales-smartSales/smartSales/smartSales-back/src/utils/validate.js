const User = require('../models/admin.model');
const Company = require('../models/company.model')
const bcrypt = require('bcrypt-nodejs')

exports.validateData = (data) => {
    let keys =Object.keys(data), msg = '';
    for(let key of keys) {
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} is required \n`
    }
    return msg.trim();
};

exports.searchCompanyUsername =async(username)=>{
    try {
        const companyExist = await Company.findOne({username: username}).lean();
        return companyExist
        
    } catch (error) {
        console.log(error);
        return error;
    }
};
exports.searchCompanyName =async(name)=>{
    try {
        const companyExist = await Company.findOne({name: name}).lean();
        return companyExist
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.searchCompany1 =async(username)=>{
    try {
        const companyExist = await Company.findOne({username: username}).lean();
        return companyExist
    } catch (error) {
        console.log(error);
        return error;
    }
};



exports.searchAdmin =async(username)=>{
    try {
        const userExist = await User.findOne({username: username}).lean();
        return userExist
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.encrypt = async(password)=>{
    try {
        return bcrypt.hashSync(password);
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.checkPassword = async (password, hashSync) => {
    try {
        return bcrypt.compareSync(password, hashSync);
    }catch(err) {
        console.log(err);
        return err;
    }
}

exports.checkDataUpdate = async(user)=>{
    try {
        if(user.password || Object.entries(user).length===0 || user.role){
            return false;
        }else{
            return true;
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};
exports.checkDataUpdate1 = async(company)=>{
    try {
        if(company.password || Object.entries(company).length===0 || company.role){
            return false;
        }else{
            return true;
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.checkPermission = async(userId, sub)=>{
    try {
        if(userId == sub){
            return true;
        }else{
            return false;
        }
        
    } catch (error) {
        console.log(error);
        return error;
        
    }
};
exports.checkPermission1 = async(companyId, sub)=>{
    try {
        if(companyId == sub){
            return true;
        }else{
            return false;
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};


exports.orderProducts = async (products)=>{
    try {
        products.sort((a,b)=> b.stock - a.stock);
        return products;

    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.orderProducts2 = async (products)=>{
    try {
        products.sort((a,b)=> a.stock - b.stock);
        return products;

    } catch (error) {
        console.log(error);
        return error;
    }
}