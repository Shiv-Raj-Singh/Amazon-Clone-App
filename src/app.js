import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';

import './dbConnection/db.js'
import multer from 'multer';
import globalError  from './middleware/globalErrorHandler.js';
import routes from './routes/route.js'
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(multer().any())

app.use('/' ,routes )
app.use( globalError )

// console.log(`${process.env.MONGO_DB}`)
app.listen(port , ()=>{
    console.log(`Your Application is Running on ${port}`)
})
