//onde cria os schema do database
const { Schema, model} = require('mongoose');

const DesignModel = new Schema({
    name:{
        type: String,
        required: true
    },
    login:{
        type: String,
        required: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    products:[{
        name:{
            type: String,
            require: true,
        },
        value:{
            type: Number,
            require: true
        },
        category:{
            type: String,
            require: true
        }
    }],
})

module.exports = model('designers', DesignModel);