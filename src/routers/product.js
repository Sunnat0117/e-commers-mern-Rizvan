const {Router} = require('express')
const { requestSignin, adminMiddleware } = require('../common-middware')
const {create_Product }=  require('../controllers/product')
const multer  =  require('multer');
const router =  Router()
const shortid =  require('shortid')
const path =  require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    }, 
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/product/create', requestSignin , adminMiddleware, upload.array('productPicture'),  create_Product)



module.exports = router