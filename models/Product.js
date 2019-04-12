const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    product_name:{
        type:String
    },
    product_price:{
        type:String
    },
    product_status:{
        type:String
    },
    product_posted_by:{
        type:String
    },
    product_image_url:{
        type:String
    },
    seller_id:{
      type : String
    }
});


module.exports = Product =  mongoose.model('Product', productSchema);
