const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transactionsSchema = new Schema({
    house_name:{
      type:String
    },
    seller:{
        type:String
    },
    buyer:{
        type:String
    },
    date:{
        type:Date
    },
    transaction_type:{
        type:String
    },
    price:{
        type:Schema.Types.Decimal128
    }
});


module.exports = Transactions =  mongoose.model('Transactions', transactionsSchema);
