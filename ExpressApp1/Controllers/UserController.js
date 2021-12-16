const User = require('../Models/InputModels/User');
const response = require('../Models/OutputModels/ResponseBase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validateLogin = require('../Common/Validate/User/Login');
const userRepository = require('../Utils/repositories/User.repository');

async function setPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}; 

async function checkUser(password, passwordHash) {
    const match = await bcrypt.compareSync(password, passwordHash);
    return match;
}

async function throwException(req, res, ex) {
    const err = new Error(ex);
    return response.ResponseBase(req, res, 500, err.message);
}

exports.Load_List = async (req, res) => {
    try {
        await User.find({}, async (req, Data, err) => {
            if (err) {
                response.ResponseBase(req, res, res.statusCode, err.message);
            }
            else {
                response.ResponseBase(req, res, res.statusCode, "Thành công !", Data);
            }
        })
    }
    catch (ex) {
        throwException(req, res, ex);
    }
};

exports.Login = async (req, res) => {
    try {
        let RequestUser = {
            UserName: req.body.UserName,
            Password: req.body.Password
        }

        // Check validation
        const { errors, isValid } = validateLogin(RequestUser);
        if (!isValid) {
            response.ResponseBase(req, res, 400, errors);
        }
        else {
            let isUser = await User.findOne({ UserName: RequestUser.UserName });
            if (!isUser) {
                response.ResponseBase(req, res, res.statusCode, "Tài khoản không tồn tại !");
            }
            else if (checkUser(RequestUser.Password, isUser.Password)) {
                response.ResponseBase(req, res, res.statusCode, "Mật khẩu không chính xác !");
            }
            else {
                jwt.sign(RequestUser.UserName, 'secret', (err, token) => {
                    if (err) {
                        response.ResponseBase(req, res, res.statusCode, err.message);
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
        }
    }
    catch (ex) {
        throwException(req, res, ex);
    }
}

exports.Register = async (req, res) => {
    try {
        let RequestUser = new User(
            {
                UserName: req.body.UserName,
                Password: req.body.Password,
                FullName: req.body.FullName,
                Email: req.body.Email,
                Roles: req.body.Roles
            }
        );
        // Check validation
        const { errors, isValid } = validateLogin(RequestUser);
        if (!isValid) {
            response.ResponseBase(req, res, 400, errors);
        }
        else {
            let isUser = await User.findOne({ UserName: req.body.UserName });
            if (!isUser) {
                RequestUser.Password = await setPassword(req.body.Password);
                await RequestUser.save(async (err) => {
                    if (err) {
                        response.ResponseBase(req, res, res.statusCode, err.message);
                    }
                    else {
                        response.ResponseBase(req, res, res.statusCode, "Đăng kí thành công !");
                    }
                })
            }
            else {
                response.ResponseBase(req, res, res.statusCode, "Tên tài khoản đã tồn tại. Đăng kí thất bại !")
            }
        }    
    }
    catch (ex) {
        throwException(req, res, ex);
    }
};

exports.Update = async (req, res) => {
    try {
        let isUser = await User.findOne({ UserName: req.body.UserName });
        if (!isUser) {
            await User.findByIdAndUpdate(req.body.id, { $set: req.body }, async function (err, Data) {
                if (err) {
                    response.ResponseBase(req, res, res.statusCode, err.message);
                }
                else {
                    response.ResponseBase(req, res, res.statusCode, "Cập nhật thành công !", Data);
                }
            });
        }
        else {
            response.ResponseBase(req, res, res.statusCode, "Tên tài khoản đã tồn tại !");
        }
    }
    catch (ex) {
        throwException(req, res, ex);   
    }
};

exports.Delete = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id, async (err) => {
            if (err) {
                response.ResponseBase(req, res, res.statusCode, err.message);
            }
            else {
                response.ResponseBase(req, res, res.statusCode, "Xóa thành công !")
            }
        })
    }
    catch (ex) {
        throwException(req, res, ex);  
    }
};

exports.Load_By_Id = async (req, res) => {
    try {
        let result = await userRepository.findById(req.body.id); 
        response.ResponseBase(req, res, res.statusCode, "Thành công !", result);
    }
    catch (ex) {
        throwException(req, res, ex);  
    }
}