const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let judgementSchema = new Schema({
    house_name:{
      type:String
    },
    owner:{
        type:String
    },
    case_number:{
        type:Number
    },
    judgement_file_date:{
        type:Date
    },
    judgement_description:{
        type:String
    },
    amount:{
        type:Schema.Types.Decimal128
    }
});


module.exports = Judgement =  mongoose.model('Judgement', judgementSchema);
