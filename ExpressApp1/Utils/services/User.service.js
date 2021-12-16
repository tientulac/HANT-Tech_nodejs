const Service = require('../services/Service');
const User = require('../../Models/InputModels/User');
const UserRepository = require('../repositories/User.repository');

module.exports = new class extends Service {
    constructor() {
        // Gọi lại tầng Repository
        this.UserRepository = UserRepository;
        this.User = User;
    }

    async findById(id) {
        return User.find({ _id: id });
    }
}