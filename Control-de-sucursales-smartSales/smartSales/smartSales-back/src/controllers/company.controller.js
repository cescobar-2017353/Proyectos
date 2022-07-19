'use strict'
const { param } = require('express/lib/request');
const Company = require('../models/company.model')
const {validateData, searchCompany, encrypt, checkPassword, checkDataUpdate, checkPermission, searchAdmin, searchCompany1, searchCompanyUsername, searchCompanyName} = require('../utils/validate');
const Branch = require('../models/branch.model');
const ProductCompany = require('../models/productCompany.model');
const ProductBranch = require('../models/productBranch.model');



//Un Admin registra una Empresa 
exports.registerCompanyByAdmin = async(req, res)=>{
    try {
        const params = req.body;
        const data ={
          name: params.name.toUpperCase(),
          type: params.type,
          username: params.username,
          password: params.password,
          role: 'CLIENT'
        }

        let msg = validateData(data);
        if(!msg){

          const companyExistUsername = await searchCompanyUsername(params.username);
          const companyExistName = await searchCompanyName(params.name.toUpperCase());
          if(!companyExistUsername && !companyExistName ){
              data.password= await encrypt(params.password);

              let company = new Company(data);
              await company.save();
              company.password = undefined;
              return res.status(200).send({message:'Company saved', company})

          }else{
              return res.status(400).send({message:'This company or username already exist'})
          }
            
        }else{
            return res.status(400).send(msg)
        }

    } catch (error) {
      console.log(error);
      return error;  
    }
}

//Mostrar Companys
exports.getCompanys = async (req, res)=>{
  try {
      const companys = await Company.find({role:'CLIENT'});
      return res.status(200).send({companys});
  } catch (error) {
      console.log(error);
      return error;
  }
};


//Mostrar una sola Company
exports.getCompany = async (req, res)=>{
  try {
      const companyId = req.params.id
      const company = await Company.findOne({_id: companyId})
      return res.status(200).send({company});
  } catch (error) {
      console.log(error);
      return error;
  }
};

//Actualizar Company por un ADMIN 
exports.updateCompanyByAdmin = async (req, res)=>{
  try {
      const companyId = req.params.id;
      const params = req.body;
      const companyExist = await Company.findOne({_id: companyId});
      if(companyExist){
          if(companyExist.role === 'ADMIN'){
              return res.status(400).send({message:'You can not update an ADMIN'})
          }else{
              const checkData = await checkDataUpdate(params);
          if(checkData === false){
              return res.send({message:'Unable to update this data'});
          }else{  
              const companyExistUsername = await searchCompanyUsername(params.username);
              const companyExistName = await searchCompanyName(params.name);
              if(!companyExistUsername && !companyExistName ){
                  const companyUpdate = await Company.findOneAndUpdate({_id: companyId}, params,{new:true});
                  companyUpdate.password = undefined;
                  return res.status(200).send({message:'Company updated', companyUpdate });
              }else{
                  return res.status(400).send({message:'This username or name already exists'});
                  }
              }
          }          
      }else{
          return res.status(404).send({message:'Company not found'})
      }
  } catch (error) {
      
  }
}

//Eliminar Empresa por un ADMIN
exports.deleteCompanyByAdmin = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const companyExist = await Company.findOne({_id:companyId});
        if(companyExist){
            if(companyExist.role === 'ADMIN'){
                return res.status(400).send({message:'You can not delete an ADMIN'})
            }else{
                const deleteCompany = await Company.findOneAndDelete({_id: companyId});
  
                const deleteBranch = await Branch.deleteMany({company: companyId});
  
                const deleteProducts = await ProductCompany.deleteMany({company: companyId});
  
                const deleteProductsBranch = await ProductBranch.deleteMany({productsCompany: companyId});
                deleteCompany.password = undefined;
                return res.status(200).send({message:'Company deleted', deleteCompany});
            }
        }else{
            return res.status(404).send({message:'Company not found'});
        }
    } catch (error) {
        console.log(error);
        return error;
    }
  };





