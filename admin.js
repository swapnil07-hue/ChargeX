const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new Schema({
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

adminSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;
