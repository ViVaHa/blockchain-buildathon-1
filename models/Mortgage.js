const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mortgageSchema = new Schema({
    house_name:{
      type:String
    },
    owner:{
        type:String
    },
    current_balance:{
        type:Schema.Types.Decimal128
    },
    status:{
        type:String
    },
    amount:{
        type:Schema.Types.Decimal128
    }
});


module.exports = Mortgage =  mongoose.model('Mortgage', mortgageSchema);
