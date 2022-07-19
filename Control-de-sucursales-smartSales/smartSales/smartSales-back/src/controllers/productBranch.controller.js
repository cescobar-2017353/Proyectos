'use strict'
const ProductBranch = require('../models/productBranch.model');
const {validateData, orderProducts, orderProducts2} = require('../utils/validate');
const ProductCompany = require('../models/productCompany.model');

//Enviar productos de la empresa a sucursales
exports.addProductBranch = async(req, res) => {
    try {
        const params = req.body;
        let data = {
            productCompany: params.productCompany,
            branch: params.branch,
            stock: Number(params.stock),
            totalSales: 0
        };
        const msg = validateData(data);
        if(!msg){
            const productBranchExist = await ProductBranch.findOne({productCompany: params.productCompany, branch: params.branch});
            if(!productBranchExist) {
                const searchProducyCompany = await ProductCompany.findOne({_id: params.productCompany});
                if(params.stock <= searchProducyCompany.stock){
                    let productBranch = new ProductBranch(data);
                    await productBranch.save();
                    const updateProductCompany = await ProductCompany.findOneAndUpdate({_id: params.productCompany}, {stock: searchProducyCompany.stock - params.stock}, {new:true});
                    return res.status(200).send({message: 'Product added successfully', productBranch, updateProductCompany});
                }else{
                    return res.status(400).send({message: 'Quantity not available'});
                }
            }else{
                const searchProducyCompany = await ProductCompany.findOne({_id: params.productCompany});
                if(params.stock <= searchProducyCompany.stock){
                    const searchProductBranch = await ProductBranch.findOne({productCompany: params.productCompany, branch: params.branch});
                    let updateProductBranch = await ProductBranch.findOneAndUpdate({productCompany: params.productCompany, branch: params.branch}, {stock: searchProductBranch.stock + data.stock}, {new:true});
                    const updateProductCompany = await ProductCompany.findOneAndUpdate({_id: params.productCompany}, {stock: searchProducyCompany.stock - params.stock}, {new:true});
                    return res.status(200).send({message: 'Product added successfully', updateProductBranch, updateProductCompany});
                }else{
                    return res.status(400).send({message: 'Quantity not available'});
                }
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err) {
        console.log(err);
        return err;
    }
}

exports.addSale = async (req, res)=>{
    try{
        const params = req.body;
        let data ={sale: Number(params.sale)};
        const productBranchId = req.params.id;
        const searchProductBranch = await ProductBranch.findOne({_id: productBranchId});
        if(data.sale <= searchProductBranch.stock){
            const updateProductBranch = await ProductBranch.findOneAndUpdate({_id: productBranchId}, {stock: searchProductBranch.stock - data.sale, totalSales: searchProductBranch.totalSales + data.sale}, {new: true});
            return res.status(200).send({message: 'Sale add successfully', updateProductBranch});
        }else{
            return res.status(400).send({message: 'Non-existing quantity'});
        }
    }catch (err) {
        console.log(err);
        return err;
    }
}

exports.getProductsBranch = async (req, res) =>{
    try {
        const branchId = req.params.id;
        const productsBranch = await ProductBranch.find({branch: branchId}).populate('productCompany')
        const productsOrder = await orderProducts(productsBranch);
        return res.status(200).send({productsOrder});
    }catch (err){
        console.log(err);
        return err;
    }
}

exports.getProductsBranch2 = async (req, res) =>{
    try {
        const branchId = req.params.id;
        const productsBranch = await ProductBranch.find({branch: branchId}).populate('productCompany')
        const productsOrder = await orderProducts2(productsBranch);
        return res.status(200).send({productsOrder});
    }catch (err){
        console.log(err);
        return err; 
    }
};
 exports.getProductBranch= async (req,res) =>{
     try {
        const productBranchId = req.params.idProduct
        const productBranch = await ProductBranch.findOne({_id: productBranchId})
        return res.status(200).send({productBranch});
         
     } catch (error) {
         console.log(error)
         return error;

     }
 }