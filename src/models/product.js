const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type :  String,
        required: true,
        trim :  true
    },
    slug : {
        type :  String,
        unique :  true,
        required :  true
    },
    price : {
        type : String,
        required :  true
    },
    description : {
        type : String,
        required :  true,
        trim : true
    },
    offer : { type : Number},
    productPicture : [
        { img : { type : String}}
    ],
    reviews : [
        {
            userId :{ type : mongoose.Schema.Types.ObjectId,  ref : 'User'},
            review : String
        }
    ],
    category : { type :  mongoose.Schema.Types.ObjectId, ref : 'Category'},
    createdBy : { type : mongoose.Schema.Types.ObjectId,  ref : 'User'},
    updatedAt : Date

}, {timestamps :  true})

module.exports =  mongoose.model('Product', productSchema)