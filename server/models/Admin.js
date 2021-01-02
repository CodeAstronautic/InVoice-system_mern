const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
  name: {
    type: String,
    
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
   unique: true ,
    trim: true,
    minlength: 5,
    maxlength: 100 
  },
  image: {
    type: String
  },
  address: {
    type: String 
  } ,
  phone: {
    type: Number  ,
    unique : true
   
  },
  password: {
    type: String,
    
    minlength: 5,
    maxlength: 1024
  } ,
  

   role : {
     type: String , 
     isAdmin: true
   }
});

module.exports = mongoose.model('admin', adminSchema);
