const Repository = require('../repositories/Repository');
const User = require('../../Models/InputModels/User');

module.exports = new class extends Repository {
    async findById(id) {
        return this.model.findById({ _id: id });
    }
}