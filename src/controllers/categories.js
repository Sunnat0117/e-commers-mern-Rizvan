const slugify =  require('slugify')
const Category =  require('../models/category')


function createCategories(categories,  parentId = null){
    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else {
        category =  categories.filter(cat => cat.parentId == parentId)
    }

    for(cate of category){
            categoryList.push({
                _id: cate._id,
                name : cate.name,
                slug : cate.slug,
                children : createCategories(categories, cate._id)
            })
    }
    return categoryList;
}

exports.addCategory = (req, res)=>{
    const categoryObj = {
        name : req.body.name,
        slug : slugify(req.body.name)

    } 

    if(req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    const categoty =  new Category(categoryObj);

    categoty.save((error, data)=>{
        if(error){
            return res.status(404).json({ error :  error})
        }
        if(data) {
            return res.status(200).json({
                message :  "Created new category",
                category : data
            })
        }else { res.status(400).json({message : "Something went wrong"})}
    })
}

exports.getCategory = (req, res) =>{
    Category.find({})
    .exec((error, categories)=>{
        if(error){
            return res.status(404).json({ error :  error})
        }
        if(categories){ 

            const categoryList =  createCategories(categories)
            return res.status(200).json(categoryList)}
    })
}