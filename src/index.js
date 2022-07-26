const express =  require('express')
const app =  express();
const mongoose  =  require('mongoose')
const expressFileUpload =  require("express-fileupload")
const path = require('path')
const bodyParser =  require('body-parser')
require('dotenv').config();



// routers
const authRouter =  require('./routers/auth')
const adminRouter =  require('./routers/admin/auth')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')





// mongodb+srv://Sunnat:<password>@cluster0.xcdqp.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.xcdqp.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('database connected')
})
.catch((error)=>{
    console.log(error)
});

function filePathMiddleware(path){
    return function (req, res, next){
        req.file = path
        next()
    }
}

app.use(expressFileUpload({}))
app.use(filePathMiddleware(path.resolve(__dirname, 'uploads')))
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', adminRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})

