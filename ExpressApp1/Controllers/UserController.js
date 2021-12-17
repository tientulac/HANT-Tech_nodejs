const User = require('../Models/InputModels/User');
const response = require('../Models/OutputModels/ResponseBase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validateLogin = require('../Common/Validate/User/Login');
const userService = require('../Utils/services/User.service');
const handleError = require('../Common/HandleError');
const printStacktrace = handleError.PrintStacktrace;

async function setPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}; 

async function checkUser(password, passwordHash) {
    const match = await bcrypt.compareSync(password, passwordHash);
    return match;
}

exports.Load_List = async (req, res) => {
    try {
        const result = await userService.Ifind();
        if (!result) {
            printStacktrace.errorNotFound(req, res);
        }
        else {
            response.ResponseBase(req, res, res.statusCode, "Thành công !", result);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Login = async (req, res) => {
    try {
        let RequestUser = {
            UserName: req.body.UserName,
            Password: req.body.Password
        };
        let reqUserName = {
            UserName: req.body.UserName
        };
        // Check validation
        const { errors, isValid } = validateLogin(RequestUser);
        if (!isValid) {
            response.ResponseBase(req, res, 400, errors);
        }
        else {
            let isUser = await userService.ILogin(reqUserName);
            if (!isUser) {
                printStacktrace.errorNotFound(req, res);
            }
            else {
                let check = await checkUser(RequestUser.Password, isUser.Password);
                if (check) {
                    jwt.sign(RequestUser.UserName, 'secret', (err, token) => {
                        if (err) {
                            printStacktrace.errorInternalServer(req, res);
                        }
                        else {
                            let userInfo = {
                                UserInfo: isUser,
                                Token: token
                            };
                            response.ResponseBase(req, res, res.statusCode, "Đăng nhập thành công !", userInfo);
                        }
                    })
                }
                else {
                    printStacktrace.errorBadRequest(req, res);
                }
            }
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
}

exports.Register = async (req, res) => {
    try {
        let RequestUser = {
                UserName: req.body.UserName,
                Password: req.body.Password,
                FullName: req.body.FullName,
                Email: req.body.Email,
                Roles: req.body.Roles
            };
        // Check validation
        const { errors, isValid } = validateLogin(RequestUser);
        if (!isValid) {
            response.ResponseBase(req, res, 400, errors);
        }
        else {
            let isUser = await userService.IfindOne({ UserName: req.body.UserName });
            if (!isUser) {
                RequestUser.Password = await setPassword(req.body.Password);
                const result = await userService.IRegister(RequestUser);
                if (result) {
                    response.ResponseBase(req, res, res.statusCode, "Đăng kí thành công !");
                }
                else {
                    printStacktrace.errorBadRequest(req, res);
                }
            }
            else {
                response.ResponseBase(req, res, 400, "Tên tài khoản đã tồn tại. Đăng kí thất bại !")
            }
        }    
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Update = async (req, res) => {
    try {
        const result = await userService.IupdateOne({ _id: req.params.id }, req.body);
        if (result) {
            response.ResponseBase(req, res, res.statusCode, "Cập nhật thành công !");
        }
        else {
            printStacktrace.errorBadRequest(req, res);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Delete = async (req, res) => {
    try {
        const result = await userService.IdeleteOne({ _id: req.params.id });
        if (result) {
            response.ResponseBase(req, res, res.statusCode, "Xóa thành công !");
        }
        else {
            printStacktrace.errorBadRequest(req, res);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};
