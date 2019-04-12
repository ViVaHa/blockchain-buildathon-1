const validator = require('validator');
const isEmpty = require('is-empty');


module.exports = function registerValidation(data){
  let errors={};
  if(isEmpty(data.name)){
    data.name="";
  }
  if(isEmpty(data.email)){
    data.name="";
  }
  if(isEmpty(data.password)){
    data.name="";
  }
  if(validator.isEmpty(data.name)){
    errors.name = "Invalid Name";
  }
  if(validator.isEmpty(data.email) || !validator.isEmail(data.email)){
    errors.email = "Invalid email";
  }
  if(validator.isEmpty(data.password)){
    errors.email = "Invalid password";
  }

return{
  errors,
  isValid : isEmpty(errors)
};

};
