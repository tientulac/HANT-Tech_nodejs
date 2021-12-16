const Service = require('../services/Service');
const User = require('../../Models/InputModels/User');
const UserRepository = require('../repositories/User.repository');

module.exports = new class extends Service {
    constructor() {
        // Gọi lại tầng Repository
        super();
        this.UserRepository = UserRepository;
        this.User = User;
    }

    async IfindById(id) {
        return UserRepository.RfindById(id);
    }
    async Ifind() {
        return UserRepository.Rfind();
    }
    async ILogin(req) {
        return UserRepository.RfindOne(req);
    }
    async IfindOne(req) {
        return UserRepository.RfindOne(req);
    }
    async IRegister(req) {
        return UserRepository.RinsertOne(req);
    }
}