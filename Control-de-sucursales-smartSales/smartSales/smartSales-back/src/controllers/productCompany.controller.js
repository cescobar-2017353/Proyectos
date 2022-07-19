'use strict'
const { param } = require('express/lib/request');
const ProductCompany = require('../models/productCompany.model');
const {validateData, checkPermission1, checkDataUpdate1, orderProducts, orderProducts2 } = require('../utils/validate');
const ProductBranch = require('../models/productBranch.model')

//Agregar un producto
exports.addProductCompany = async(req, res)=>{
    try {
        const params = req.body;
        const companyId = req.company.sub

        const data = {
            name: params.name.toUpperCase(),
            supplier: params.supplier,
            stock: params.stock,
            company: companyId
        }
        const msg = validateData(data);
        if(!msg){
            const ProductCompanyExist = await ProductCompany.findOne({name: params.name.toUpperCase(), company:companyId});
            if(!ProductCompanyExist){
                let productCompany = new ProductCompany(data);
                await productCompany.save();
                return res.status(200).send({message:'Produc created successfully', productCompany});
            }else{
                return res.status(400).send({message:'Produc already exist'});
            }
        }else{
            return res.status(400).send(msg);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
//Mostrar un solo producto
exports.getProductCompany = async (req, res)=>{
    try {
        const companyId = req.params.id
        const product = await ProductCompany.findOne({_id: companyId})
        return res.status(200).send({product});
    } catch (error) {
        console.log(error);
        return error;
    }
  };


//Mostrar todos los Productos de mayor a menor
exports.getProducts = async (req, res)=>{
    try {
        const productCompanyId = req.company.sub
        const products = await ProductCompany.find({company: productCompanyId});
        const productsOrder = await orderProducts(products);
        return res.status(200).send({productsOrder});
    } catch (error) {
        console.log(error);
        return error;
    }
  };

  //Mostrar productos de menor a mayor
  exports.getProducts2 = async (req, res)=>{
    try {
        const companyId = req.company.sub
        const products = await ProductCompany.find({company: companyId});
        const productsOrder = await orderProducts2(products);
        return res.status(200).send({productsOrder});
    } catch (error) {
        console.log(error);
        return error;
    }
  };
  //Actualizar Producto
exports.updateProduct = async (req, res)=>{
    try {
        const productCompanyId = req.params.id;
        const params = req.body;
        const companyId = req.company.sub;
        const productExist = await ProductCompany.findOne({_id: productCompanyId});
        if(productExist){
            const permission = await checkPermission1(companyId, productExist.company)
           if(permission === true){
            const checkData = await checkDataUpdate1(params);
             if(checkData === false){
                return res.status(400).send({message:'Unable to update this data'});
             }else{
                const existProduct = await ProductCompany.findOne({name: params.name.toUpperCase(), company:companyId});
                if(!existProduct){
                    const productUpdate = await ProductCompany.findOneAndUpdate({_id: productCompanyId}, {name: params.name.toUpperCase(), stock: params.stock, supplier: params.supplier} ,{new:true});
                    return res.status(200).send({message: 'Product Updated', productUpdate});
                }else{
                    return res.status(400).send({message: 'Product already exist'});
                }
             }
           }else{
            return res.status(400).send({message:'Accion unauthorized'});
           } 
        }else{
            return res.status(400).send({message: 'Product not found'});
        }
    } catch (error) {
        
    }
  }
  //Eliminar una sucursal de la empresa logeada
exports.deleteProduct = async(req, res)=>{
    try {
        const companyId = req.company.sub;
        const productCompanyId = req.params.id;

        const producExist = await ProductCompany.findOne({_id: productCompanyId});
        if(producExist){
            const permission = await checkPermission1(companyId, producExist.company);
            if(permission === true){

                const deleteProduct = await ProductCompany.findOneAndDelete({_id: productCompanyId});
                const deleteProductBranch = await ProductBranch.deleteMany({productCompany: productCompanyId})

                return res.status(200).send({message:'Product Deleted', deleteProduct});
            }else{
                return res.status(400).send({message:'Accion unauthorized'})
            }

        }else{
            return res.status(404).send({message:'Product not found'}) 
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};