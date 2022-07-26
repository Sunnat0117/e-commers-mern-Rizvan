const Product = require('../models/product.js')
const slugify = require('slugify')
const shortid = require('shortid')

exports.createProduct = (req, res, next) => {


    // res.status(200).json({message : "hello"})
    // console.log(req.files)
        
    const {
        name, price, description, category, quantity,createdBy
    } = req.body
    console.log(req.body)
    console.log(req.files)

     
    let productPictures = []

    if(req.files.length > 0) {
        productPictures = req.file.map(file => {
            return { img: files.filename }
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
})  

    product.save(((error, product) => {
        if(error) return res.status(400).json({ error })
        if(product) return res.status(201).json({ product })
    }))

}