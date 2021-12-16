const validator = require("validator");
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(user) {
    let errors = {};

    // UserName checks
    if (isEmpty(user.UserName)) {
        errors.UserName = "Tên đăng nhập không được bỏ trống !";
    } 
    // Password checks
    if (isEmpty(user.Password)) {
        errors.Password = "Mật khẩu không được để trống !";
    } else if (!validator.isLength(user.Password, { min: 6, max: 30 })) {
        errors.Password = "Mật khẩu ít nhất là 6 ký tự";
    } 
    
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  