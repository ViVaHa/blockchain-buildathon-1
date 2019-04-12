const express = require('express');
const router = express.Router();
const key = require('../../config/keys');
const registerValidation = require('../../register');
const loginValidation = require('../../login');
const User = require('../../models/User')
const Product =  require('../../models/Product')

router.route('/account/:email').get(function(req,res){
  var loggedInUser = req.params.email;
  User.find({email : loggedInUser  },function(err,users){
      if(err){
          console.log(err);
      } else {
          res.json(users);
      }
  });
});

router.route('/list').get(function(req,res){
  User.find({ },function(err,users){
      if(err){
          console.log(err);
      } else {
          res.json(users);
      }
  });
});

router.route('/delete/:email').get(function(req,res){
  var loggedInUser = req.params.email;

  Product.deleteMany({$and : [{ product_posted_by : loggedInUser},{product_status : {$ne : "sold"}}]},function(err,products){
    if(err){
        console.log(err);
    } else {
       console.log("Deleted Products now deleting user ");
       User.deleteOne({email : loggedInUser  },function(err,users){
      if(err){
          console.log(err);
      } else {
          console.log("Deleted User");
          res.json(users);
      }
  });
    }
});


});




router.put('/approve/:email', function (req, res) {
    var user = req.params.email;
    var query = {'email':user};
    var modifiedAccountStatus = "approved";
    User.findOneAndUpdate(query, {accountStatus: modifiedAccountStatus}, function(err, success){
        if(err){
          console.log(err);
        }else{
          res.status(200).json(user);
        }
    });

});

router.post('/register', (req,res) =>{
  console.log(req.body);
  const {errors , isValid} = registerValidation(req.body);
  if(!isValid){
    res.status(400).json(errors);
  }else{
    User.findOne({email:req.body.email})
    .then(user =>{
      if(user){
        res.status(400).json({email:'Email Already Exists'});
      }else{
        const newUser = new User({
          email : req.body.email,
          name : req.body.name,
          password : req.body.password,
          accountBalance : req.body.accountBalance,
          accountType : req.body.accountType
        });
        newUser.save()
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err));
      }
    });
  }

});


router.post('/login', (req,res)=>{
  const {erros, isValid} = loginValidation(req.body);
  if(!isValid){
    res.status(400).json(errors);
  }else{
    User.findOne({email : req.body.email})
    .then(user =>{
      if(!user){
        res.status(400).json({email : 'Invalid Email Address'});
      }
      if(user.password.localeCompare(req.body.password)!=0){
        res.status(400).json({errorMsg : 'Password is incorrect'});
      }
      if(user.accountStatus.localeCompare('pending')==0){
        res.status(400).json({errorMsg: 'Chair Person has to approve your account'});
      }
      console.log(user.accountStatus.localeCompare('pending'));
      res.json({
        success: true,
        email : req.body.email,
        id : user._id
      });
    })
  }
});









module.exports = router;
