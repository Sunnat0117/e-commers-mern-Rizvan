const {Router} = require('express')
const { requestSignin, adminMiddleware } = require('../common-middware')
const {create_Product }=  require('../controllers/product')
const multer  =  require('multer');
const upload = multer({ dest : 'uploads/'})
const router =  Router()

router.post('/product/create', requestSignin , adminMiddleware, upload.single('productPicture'),  create_Product)



module.exports = router