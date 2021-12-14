const User = require('../Models/InputModels/User');
const response = require('../Models/OutputModels/ResponseBase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validate = require('../Common/Validate/User/Validate');

const saltRounds = 10;


async function setPassword(password) {
    password = await (bcrypt.hash(password, saltRounds)).toString();
    return password;
}; 

async function checkUser(password, passwordHash) {
    const match = await bcrypt.compare(password, passwordHash);
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

exports.Register = async (req, res) => {
    try {
        let hashedPassword = await setPassword(req.body.Password);
        let RequestUser = new User(
            {
                UserName: req.body.UserName,
                Password: hashedPassword,
                FullName: req.body.FullName,
                Email: req.body.Email,
                Roles: req.body.Roles
            }
        );
        let check = validate.require(req);
        let isUser = await User.findOne({ UserName: req.body.UserName });
        if (!isUser) {
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

exports.Login = async (req, res) => {
    try {
        let { UserName, Password } = req.body;
        let isUser = await User.findOne({ UserName: UserName });
        if (!isUser) {
            response.ResponseBase(req, res, res.statusCode, "Tài khoản không tồn tại !");
        }
        if (!checkUser(Password, isUser.Password)) {
            response.ResponseBase(req, res, res.statusCode, "Mật khẩu không chính xác !");
        }
        else {
            jwt.sign(UserName, 'secret', (err, token) => {
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
    catch (ex) {
        throwException(req, res, ex);
    }
}

