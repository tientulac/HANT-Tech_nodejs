module.exports = class {
    constructor(model) {
        this.model = model;
    }

    RfindById(id) {
        return this.model
        .findById(
            { _id: id }
        ).lean();
    }

    Rfind() {
        return this.model
          .find()
          .lean();
    };

    RfindOne(req) {
        return this.model
          .findOne(req)
          .lean();
    }

    RinsertOne(req) {
        return this.model
          .insertOne(req)
          .lean();
    }

    RdeleteOne(id) {
        return this.model
          .deleteOne(id)
          .lean();
    }

    RupdateOne(id, req) {
        return this.model
          .updateOne(id, req)
          .lean();
    }
}
