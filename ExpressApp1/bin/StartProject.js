const app = require('../app');
const setupPort = require('../Common/SetupPort');
const routerAPI = require('../Common/RouterAPI');
const handleError = require('../Common/HandleError');
const allowCors = require('../Common/EnableCors');
//--------------------------------------------------------CONNECT MONGO---------------------------------------------------
const connectMongoose = require('../WebConfig');
connectMongoose.connectDB();
