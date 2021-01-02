const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const monthSchema = new Schema({
 month: { 
    type: Number,
   
    unique: true,
    trim: true,
    minlength: 1 ,
    maxlength: 2
  },
}, {
  timestamps: true,
});

const Month = mongoose.model('month', monthSchema);

module.exports = Month;