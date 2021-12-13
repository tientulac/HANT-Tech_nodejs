const mongoose = require('mongoose');

module.exports = { connectDB };

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect Database admin successfully !!!')
    } catch (err) {
        console.log(err);
    }
}

