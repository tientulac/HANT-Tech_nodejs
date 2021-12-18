//Chọn môi trường kết nối Database
const config = require('./Configs/_' + process.env.NODE_ENV_DEV);
const mongoose = require('mongoose');
const db = config.mongoURI;

module.exports = { connectDB };
async function connectDB() {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log(`Connect Database ${db} successfully !!!`);
    } catch (err) {
        console.log(err);
    }
}

