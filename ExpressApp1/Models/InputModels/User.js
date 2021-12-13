const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let UserSchema = new Schema({
    UserName: { type: String, required: true, max: 50 },
    Password: { type: String, required: true, max: 50 },
    FullName: { type: String, required: true, max: 50 },
    Email: { type: String, required: true, max: 50 },
    Roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

// Export the model
module.exports = mongoose.model('User', UserSchema, "User");