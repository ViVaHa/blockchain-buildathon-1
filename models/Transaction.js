const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transactionSchema = new Schema({
   product_id:{
       type:String
   },
   buyer_id:{
       type:String
   }
});


module.exports = MyTransaction =  mongoose.model('transactions', transactionSchema);
