const body = require('body-parser');
const cookie = require('cookie-parser');
const knexLogger = require('knex-logger');
const knex = require('../index').API.DBFactory(__dirname + '/../../knexfile.js').knex;


const app = require('express')();
app.use([
    cookie(),
    body.urlencoded({extended: true}),
    body.json(),
    knexLogger(knex),
]);

app.all('/', (req, res) => res.status(200).send('Welcome in KOEX.JS test server'));

const UserRouter = require('../api/router/user/UserRouter').getRouter();
app.use('/user', UserRouter);

app.all('*', (req, res) => {
    return res.status(404).send({success: false, message: 'Unknown route'});
});

const server = app.listen(process.env.PORT, function () {
    console.log('Server is listening to all incoming requests on port ' + process.env.PORT);
});

module.exports = server;