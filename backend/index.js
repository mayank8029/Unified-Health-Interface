const express  = require('express')
const app = express() ; 
const cors = require('cors');
const port = 5000 ;
const dotenv = require('dotenv')


dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// define router 
const userRouter = require('./routes/userRouter')
const doctorRouter = require('./routes/doctorRouter')
const hospitalRouter = require('./routes/hospitalRouter');
const {connectToDatabase} = require('./config/db.js')


// connect to database 
connectToDatabase()

// defining points 
app.use('/api/user' , userRouter);
app.use('/api/doctor' , doctorRouter)
app.use('/api/hospital' , hospitalRouter)

app.listen(port , ()=>{
    console.log(`app is at port ${port}`)
})