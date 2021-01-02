const mongoose = require('mongoose');
const { tr } = require('date-fns/locale');
//import mongoose from 'mongoose';
const { Schema } = mongoose;

const invoiceSchema = new Schema({
 // username: { type: String, required: true },
  month: {
    type: Number ,
  
    trim: true
    
  },
  week: {
    type: Number 
  
  },
  client_name: {
    type: String ,
    unique : true
  },
  invoice_date: {
    type: Date 
    
  } , 
  created_time: {
    type: Date 
  
  } , 
  bank_account: {
    type: Number ,
    unique : true
    
  } , 
 usd: {
    type: Number
   
  } , 
  sent_via: {
    type: String
    
  } , 
  released_inr: {
    type: Number
    
  } , 
 released_date: {
    type:Date 
    
  } ,
  document : {
    type : String
  }
});

module.exports = mongoose.model('invoice', invoiceSchema);
