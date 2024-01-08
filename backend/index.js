const express  = require('express')
const app = express() ; 
const cors = require('cors');
const port = 5000 ;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// define router 
const userRouter = require('./routes/userRouter')
const doctorRouter = require('./routes/doctorRouter')
const hospitalRouter = require('./routes/hospitalRouter')

//defining points 
app.use('/api/user' , userRouter);
app.use('/api/doctor' , doctorRouter)
app.use('/api/hospital' , hospitalRouter)

app.listen(port , ()=>{
    console.log(`app is at port ${port}`)
})