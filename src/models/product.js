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
    quantity : {
        type  :  Number,
        require: true
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
    category : { type :  mongoose.Schema.Types.ObjectId, ref : 'Category',  required :  true},
    createdBy : { type : mongoose.Schema.Types.ObjectId,  ref : 'User',  required : true},
    updatedAt : Date

}, {timestamps :  true})

module.exports =  mongoose.model('Product', productSchema)