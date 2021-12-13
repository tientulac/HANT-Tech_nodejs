const app = require('../app');

const routes = require('../routes/index');
const users = require('../routes/users');
const Account = require('../routes/User');

app.use('/', routes);
app.use('/users', users);
app.use('/Account', Account);