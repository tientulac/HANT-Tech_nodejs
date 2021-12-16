module.exports = class {
    constructor(model) {
        this.model = model;
    }
    findById(id) {
        return this.model.findById({ _id: id }).leand();
    }
}