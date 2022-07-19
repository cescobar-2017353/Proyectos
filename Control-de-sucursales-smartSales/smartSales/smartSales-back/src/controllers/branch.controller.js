'use strict'
const {validateData, checkDataUpdate1, checkPermission1, } = require('../utils/validate');
const Branch = require('../models/branch.model');



//Agregar una Sucursal
exports.addBranch = async(req, res)=>{
    try {
        const params = req.body;
        const companyId = req.company.sub

        const data = {
            name: params.name.toUpperCase(),
            direction: params.direction,
            company: companyId
        }
        const msg = validateData(data);
        if(!msg){
            const branchExist = await Branch.findOne({name: params.name.toUpperCase(), direction: params.direction, company:companyId});
            if(!branchExist){
                let branch = new Branch(data);
                await branch.save();
                return res.status(200).send({message:'Branch created successfully', branch});
            }else{
                return res.status(400).send({message:'Branch already exist'});
            }
        }else{
            return res.status(400).send(msg);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Editar una sucursal de la empresa logeada
exports.updateBranch = async (req,res)=>{
    try {
        const params = req.body;
        const companyId = req.company.sub;
        const branchId = req.params.id;

        const branchExist = await Branch.findOne({_id: branchId});
        if(branchExist){
            const permission = await checkPermission1(companyId, branchExist.company)
            if(permission === true){
                const checkData = await checkDataUpdate1(params);
                if(checkData === false){
                    return res.status(400).send({message:'Unable to update this data'});
                }else{
                    const branchExist = await Branch.findOne({name:params.name.toUpperCase(), company:companyId});
                    if(!branchExist){
                        const branchUpdate = await Branch.findOneAndUpdate({_id: branchId}, {name: params.name.toUpperCase(), direction: params.direction}, {new:true});
                        return res.status(200).send({message: 'Branch Updated', branchUpdate})
                    }else{
                        return res.status(400).send({message:'Branch already exist'})
                    }
                }
            }else{
                return res.status(400).send({message:'Accion unauthorized'});
            }

        }else{
            return res.status(400).send({message:'Branch not found'})
        }

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Mostrar las sucursales de la empresa logeada
exports.getBranchs = async (req, res)=>{
    try {
        const companyId = req.company.sub;
        const branchs = await Branch.find({company: companyId});
        return res.status(200).send({branchs});

    } catch (error) {
        console.log(error);
        return error;
    }
};
exports.getBranch = async (req, res)=>{
    try {
        const branchId = req.params.id;
        const branch = await Branch.findOne({_id: branchId})
        return res.status(200).send({branch});

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Eliminar una sucursal de la empresa logeada
exports.deleteBranch = async(req, res)=>{
    try {
        const companyId = req.company.sub;
        const branchId = req.params.id;

        const branchExist = await Branch.findOne({_id: branchId});
        if(branchExist){
            const permission = await checkPermission1(companyId, branchExist.company);
            if(permission === true){
                const deleteBranch = await Branch.findOneAndDelete({_id: branchId});
                return res.status(200).send({message:'Branch Deleted', deleteBranch});
            }else{
                return res.status(400).send({message:'Accion unauthorized'})
            }

        }else{
            return res.status(404).send({message:'Branch not found'}) 
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

// Un admin puede ver las sucursales de una empresa
exports.getBranchByAdmin = async(req, res)=>{
    try {
        const companyId = req.params.id;
        const branchs = await Branch.find({company: companyId}).populate('company');

        return res.status(200).send({branchs});

    } catch (error) {
        console.log(error);
        return error;
    }
};