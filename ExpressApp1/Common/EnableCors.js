const app = require('../app');
const cors = require('cors');

//--------------------------------------------------------CORS---------------------------------------------------
app.use(cors());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
