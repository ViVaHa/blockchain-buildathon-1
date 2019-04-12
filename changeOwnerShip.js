const User = require('./models/User')
const MyTransaction = require('./models/Transaction')
const express = require('express');
const router = express.Router();
const Transaction = require('mongoose-transactions')
const transaction = new Transaction()

async function settle(user,old_user,cost,product_id,callback){

  var newOwnerId = user._id;
  var oldOwnerId = old_user._id;
  console.log(old_user.accountBalance+cost);

  const deduct = {
    accountBalance : user.accountBalance - Number.parseInt(cost)
  }
  const credit = {
    accountBalance : old_user.accountBalance + Number.parseInt(cost)
  }
  try {
    var object ={
      product_id : product_id,
      buyer_id : newOwnerId,
    }
    var insert = transaction.insert('transactions', object)
    transaction.update("users", newOwnerId, deduct);
    transaction.update("users", oldOwnerId, credit);
    const final = await transaction.run()
} catch (error) {
    console.error(error)
    const rollbackObj = await transaction.rollback().catch(console.error)
    transaction.clean()
    callback(false);
  }
}


module.exports = function changeOwnerShip(data,callback){
  var prev_owner = data.old_owner;
  var new_owner = data.new_owner;
  var cost = data.cost;
  var product_id = data.product_id;
  this.isValid = false;
  User.findOne({email : new_owner})
  .then(user =>{
    if(user.accountBalance<Number.parseInt(cost)){
      //console.log(user.accountBalance,Number.parseInt(cost))
      callback(false);
    }else{
      console.log(prev_owner);
      User.findOne({email : prev_owner})
      .then(old_user => {
          //console.log(prev_owner);
          settle(user,old_user,cost,product_id,callback);
          console.log("Transaction completed");
          callback(true);
      });
    }
  });
};
