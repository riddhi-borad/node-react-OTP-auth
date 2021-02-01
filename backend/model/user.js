const mongoose=require('mongoose');
var newschema={
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    mobile:{
        type:Number,
        trim:true,
        required:true
    },
}
module.exports=User=mongoose.model('users',newschema)