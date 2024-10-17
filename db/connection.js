import mongoose from 'mongoose'
export const connectDB = () => {
    mongoose.connect('mongodb:/127.0.0.1:27017/hti').then(()=>{
        console.log('db connection successfully');
        
    }).catch(err =>{
        console.log('fail to connect to db');
        
    })
}