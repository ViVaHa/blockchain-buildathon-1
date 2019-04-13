const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taxSchema = new Schema({
    house_name:{
      type:String
    },
    owner:{
        type:String
    },
    tax_year:{
        type:Date
    },
    taxes_received:{
        type:String
    },
    amount:{
        type:Schema.Types.Decimal128
    }
});


module.exports = Tax =  mongoose.model('Tax', taxSchema);
