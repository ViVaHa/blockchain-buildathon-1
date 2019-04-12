const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  name:{
    type : String,
    required : true
  },
  email:{
    type : String,
    required : true
  },
  password:{
    type : String,
    required : true
  },
  accountBalance:{
    type : Number,
    required : true
  },
  accountType:{
    type:String,
    required : true
  },
  accountStatus:{
    type : String,
    default: "pending"
  }
});

module.exports = User = mongoose.model("users", userSchema);
