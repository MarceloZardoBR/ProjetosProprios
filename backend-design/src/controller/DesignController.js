const DesignModel = require('../models/design');
//const hashPassword = require('../config/HashPassword');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const config = require('../config/config');

//funções CRUD
module.exports = {
    
    async create(req, res){

        const salt = bcrypt.genSaltSync(10);
        const passwd = bcrypt.hashSync(req.body.password, salt);

        const userExists = await DesignModel.findOne({email: req.body.email});

        if(userExists){
           return res.json(userExists);
        }

        const user = {
            name: req.body.name,
            login: req.body.login,
            email: req.body.email,
            password: passwd,
        }

        const design = DesignModel.create(user);
        const payload = design._id;
        var token = jwt.encode(payload, config.jwtSecret);

        return res.json({token:token});
    },

    async auth(req, res){
        
        const user = await DesignModel.findOne({ login: req.body.login});
        const msg = 'Usuario ou Senha Incorretos';
        
        if(!user){
            req.io.emit('alert', msg);
        }else{
            if(bcrypt.compareSync(req.body.password, user.password)){
            var payload = {_id: user._id};
            var token = jwt.encode(payload, config.jwtSecret);
            
            res.json({ token: token })
            
            }else{
                req.io.emit('alert', msg);
            }
    }
    },

    async user(req, res){

        const token = req.headers['x-access-token'];

        if(!token){
            res.status(401).send('NO Token Avaiable');
        }

        const data = jwt.decode(token,config.jwtSecret);

        const user = await DesignModel.findById(data._id);

        res.json(user);
    },

    async addDesign(req, res){
        
        const token = req.headers['x-access-token'];

        if(!token){
            res.status(401).send('NO Token Avaiable');
        }

        const newProducts = {
            name: req.body.name,
            value: req.body.value,
            category: req.body.category
        }
        
        const user_data = jwt.decode(token,config.jwtSecret);

        DesignModel.findOneAndUpdate({_id:user_data._id},{$push:{products:newProducts}},(err,docs) => {
            if(err){
                console.log(err);
            }else{
                res.status(201);
            }
        });
    },

    async getUserProducts(req, res){

        const token = req.headers['x-access-token'];

        if(!token){
            res.status(401).send('NO Token Avaiable');
        }

        const user_id = jwt.decode(token,config.jwtSecret);

        const data = await DesignModel.find({_id:user_id}).select('products');

        const products = data.map(d => {
           return d.products;
        });
        
        res.send(products[0]);
    },

    async editUserProduct(req, res){

        const token = req.headers['x-access-token'];
        const products = req.body.products

        if(!token){
            res.status(401).send('NO Token Avaiable');
        }

        const user_id = jwt.decode(token,config.jwtSecret);

        const data = await DesignModel.findByIdAndUpdate(user_id,{$set:{products}},{new:true})

        res.send(data);

    },

    async getProductById(req, res){

        const token = req.headers['x-access-token'];
        const product = {
            _id: req.body._id
        }

        if(!token){
            res.status(401).send('NO Token Avaiable');
        }

        const user_id = jwt.decode(token,config.jwtSecret);

        const data = await DesignModel.find(user_id)

        const userProduct = data[0].products.filter(prod => prod._id == product._id);

        res.send(userProduct);
    },

    async deleteUserProd(req, res){
        const token = req.headers['x-access-token'];
        const id_product = req.body.id;

        if(!token){
            res.status(401).send('NO Token Avaiable');
        }

        const user_id = jwt.decode(token,config.jwtSecret);

        DesignModel.update({'_id':user_id},{ $pull:{ 'products': { '_id': id_product } } }
                                            ,{multi:true},(err, status) => {
                                                if(err){
                                                    console.log(err);
                                                }else{
                                                    res.send(status);
                                                }
                                            });

    }
}