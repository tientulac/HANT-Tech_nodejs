const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let RoleSchema = new Schema({
    RoleName: { type: String, required: true, max: 50 },
});

// Export the model
module.exports = mongoose.model('Role', RoleSchema, "Role");