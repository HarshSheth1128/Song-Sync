'use strict'

const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('express')();
const http = require('http').createServer(app);

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

app.use(bodyParser.json());
const port = 4000

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next();
});

app.use('/', [require('./routes/auth'), require('./routes/user'), require('./routes/playlist')]);

http.listen(port, () => console.log(`Song Sync API listening on port: ${port}!`))

module.exports = app;
