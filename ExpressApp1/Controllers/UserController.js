const User = require('../Models/InputModels/User');
const response = require('../Models/OutputModels/ResponseBase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function setPassword(password) {
    password = bcrypt.hash(password, saltRounds);
    return password;
}; 

async function checkUser(password, passwordHash) {
    const match = await bcrypt.compare(password, passwordHash);
    return match;
}

exports.Load_List = async (req, res) => {
    try {
        await User.fin1d({}, async (req, res) => {
            if (err) {
                response.ResponseBase(req, res, res.statusCode, err);
            }
            else {
                response.ResponseBase(req, res, res.statusCode, "Thành công !", Data);
            }
        })
    }
    catch (ex) {
        response.ResponseBase(req, res, res.statusCode, ex);
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
        let isUser = await User.findOne({ UserName: req.body.UserName });
        if (!isUser) {
            await RequestUser.save(async (err) => {
                if (err) {
                    response.ResponseBase(req, res, res.statusCode, "Đăng kí thất bại !");
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
        response.ResponseBase(req, res, 2,ex);
    }
};

exports.Update = async (req, res) => {
    try {
        let isUser = await User.findOne({ UserName: req.body.UserName });
        if (!isUser) {
            await User.findByIdAndUpdate(req.body.id, { $set: req.body }, async function (err, Data) {
                if (err) {
                    response.ResponseBase(req, res, res.statusCode, err);
                }
                else {
                    response.ResponseBase(req, res, res.statusCode, "Cập nhật thành công !");
                }
            });
        }
        else {
            response.ResponseBase(req, res, res.statusCode, "Tên tài khoản đã tồn tại !");
        }
    }
    catch (ex) {
        response.ResponseBase(req, res, res.statusCode, ex);
    }
};

exports.Delete = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id, async (err) => {
            if (err) {
                response.ResponseBase(req, res, res.statusCode, "Xóa thất bại !");
            }
            else {
                response.ResponseBase(req, res, res.statusCode, "Xóa thành công !")
            }
        })
    }
    catch (ex) {
        response.ResponseBase(req, res, res.statusCode, ex)
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
                    response.ResponseBase(req, res, res.statusCode, err);
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
        response.ResponseBase(req, res, res.statusCode, ex);
    }
}

