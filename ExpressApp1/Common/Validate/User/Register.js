const validator = require("validator");
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(user) {
    let errors = {};
  
    // UserName checks
    if (validator.isEmpty(user.UserName)) {
        errors.UserName = "Tên đăng nhập không được bỏ trống !";
    } 
    // Password checks
    if (validator.isEmpty(user.Password)) {
        errors.Password = "Mật khẩu không được để trống !";
    } else if (!validator.isLength(user.Password, { min: 6, max: 30 })) {
        errors.Password = "Mật khẩu ít nhất là 6 ký tự";
    } 
    
    // FullName checks
    if (validator.isEmpty(user.FullName)) {
        errors.FullName = "Họ tên không được bỏ trống !";
    } 
    // Email checks
    if (validator.isEmpty(user.Email)) {
       errors.Email = "Email không được bỏ trống !";
    } else if (!validator.isEmail(user.Email)) {
       errors.Email = "Email bạn nhập không hợp lệ !";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  