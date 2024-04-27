const express  = require('express')
const app = express() ; 
const cors = require('cors');
const port = 5000 ;
const dotenv = require('dotenv')


const corsOptions = {
     origin: true 
}

dotenv.config();

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// define router 
const userRouter = require('./routes/userRouter')
const doctorRouter = require('./routes/doctorRouter')
const hospitalRouter = require('./routes/hospitalRouter');
const clinicRouter = require('./routes/ClinicRoutes')
const {connectToDatabase} = require('./config/db.js')


// connect to database 
connectToDatabase()


// defining points 
app.use('/api/user' , userRouter);
app.use('/api/doctor' , doctorRouter)
app.use('/api/hospital' , hospitalRouter)
app.use('/api/clinic' , clinicRouter)


//Port 
app.listen(port , ()=>{
    console.log(`app is at port ${port}`)
})