const {Router} = require('express')
const { requestSignin, adminMiddleware } = require('../common-middware')
const router =  Router()
const { addCategory, getCategory } =  require('../controllers/categories')

router.post('/category/create', requestSignin , adminMiddleware,  addCategory)
router.get('/category/getCategories', getCategory)




module.exports = router