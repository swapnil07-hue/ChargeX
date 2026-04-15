const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
  
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User",userSchema);
module.exports = User;
