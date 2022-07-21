const express =  require('express')
const app =  express();
const mongoose  =  require('mongoose')
const expressFileUpload =  require("express-fileupload")
require('dotenv').config();



// routers
const authRouter =  require('./routers/auth')
const adminRouter =  require('./routers/admin/auth')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')




// mongodb+srv://Sunnat:<password>@cluster0.xcdqp.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.xcdqp.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
.then(()=>{
    console.log('database connected')
});


app.use(expressFileUpload())
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', adminRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)






app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})


