const validator = require('validator');
const isEmpty = require('is-empty');


module.exports = function loginValidation(data){
  let errors={};

  if(isEmpty(data.email)){
    data.name="";
  }
  if(isEmpty(data.password)){
    data.name="";
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
