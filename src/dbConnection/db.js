import * as dotenv from 'dotenv' 
dotenv.config()
import mongoose from "mongoose";

mongoose.set('strictQuery', false)
mongoose.connect(`${process.env.MONGO_DB}` ,{
    useNewUrlParser : true
})
.catch(()=> { console.log('Mongo DB connected Succesfully ! ')})
.catch(err => console.log(err.message))