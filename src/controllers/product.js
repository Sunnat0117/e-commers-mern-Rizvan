const Product =  require('../models/product')
const shortid =  require('shortid')

 exports.create_Product = (req, res)=>{
    console.log(req.file)
    console.log("salom")

    // res.status(200).json({message : 'hello'})
    res.status(200).json({ file :  req.file, body : req.body})
}
