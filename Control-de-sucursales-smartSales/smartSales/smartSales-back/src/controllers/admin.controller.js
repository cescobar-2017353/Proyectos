'use strict'
const Admin = require('../models/admin.model')
const {validateData, encrypt, checkPassword, checkDataUpdate, checkPermission, searchAdmin, searchCompany1} = require('../utils/validate');
const {createToken,createTokenCompany} = require('../services/jwt');


exports.registerAdmin = async(req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name,
            surname: params.surname,
            username: params.username,
            password: params.password,
            email: params.email,
            role: 'ADMIN'
        }

        let msg = validateData(data);
        if(!msg){
            const userExist = await searchAdmin(params.username);
            if(!userExist){
                data.password= await encrypt(params.password);

                let admin = new Admin(data);
                await admin.save();
                admin.password = undefined;
                return res.status(200).send({message:'User Admin saved', admin});

            }else{
                return res.status(400).send({message:'This username already exist'})
            }

        }else{
            return res.status(400).send(msg)
        }

    } catch (error) {
        console.log(error);
        return error;
        
    }
};
//LOGIN
exports.login = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            username: params.username,
            password: params.password
        }
        let msg = validateData(data);
        if (!msg) {
            let search = await searchAdmin(params.username);
            if (search && await checkPassword(params.password, search.password)) {
                const token = await createToken(search);
                return res.status(200).send({token, message: 'Login successfully', search});
            } else {
                let search = await searchCompany1(params.username);
            if (search && await checkPassword(params.password, search.password)) {
                const token = await createTokenCompany(search);
                return res.status(200).send({token, message: 'Login Company successfully', search});
            }
                return res.status(400).send({message: 'Username or password incorrect'});
            } 

            
        } else {
            return res.status(400).send(msg);
        
        }
        
    } catch (err) {
        console.log(err);
        return err;
    }
}

