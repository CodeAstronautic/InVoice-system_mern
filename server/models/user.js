const mongoose = require('mongoose');
const { tr } = require('date-fns/locale');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: Number ,
        unique : true
    },
    address: {
        type: String
    } ,
    email: {
        type: String ,
        unique : true
    },
    password: {
        type: String ,
        minlength : 4
    } ,
    profile : { 
       // default: false ,
        type: String
   
    },
    role : {
        type: Boolean ,
         default:false,
        isAdmin : false
    },
    added_date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
