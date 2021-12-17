const Repository = require('../repositories/Repository');
const User = require('../../Models/InputModels/User');

module.exports = new class extends Repository {
    async RfindById(id) {
        return User.findById({ _id: id }).lean();
    }
    async Rfind() {
        return User.find().lean();
    }
    async RfindOne(req) {
        return User.findOne(req).lean();
    }
    async RinsertOne(req) {
        return User.create(req).then();
    }
    async RdeleteOne(id) {
        return User.findByIdAndRemove(id).lean();
    }
    async RupdateOne(id, req) {
        return User.findByIdAndUpdate(id, { $set: req }).lean();
    }
}