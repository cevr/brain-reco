const app = require('express')();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const sessionFlow = require('./controllers/sessionFlow');
const userFlow = require('./controllers/userFlow');
const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const PORT = process.env.PORT;
const IP = require('./getIp').ip;
app.use(bodyParser.json());
app.use(
    session({
        secret: 'brain-reco',
        resave: false,
        saveUninitialized: true
    })
);

app.get('/', (req, res) => {
    res.send('It is alive');
});

app.post('/register', (req, res) =>
    sessionFlow.registerHandler(req, res, db, bcrypt)
);

app.post('/login', (req, res) => {
    sessionFlow.loginHandler(req, res, db, bcrypt);
});

app.post('/logout', (req, res) => {
    sessionFlow.logoutHandler(req, res, db);
});

app.get('/checkSession', (req, res) => {
    sessionFlow.sessionCheckHandler(req, res, db);
});

app.get('/profile/:id', (req, res) => {
    userFlow.profileHandler(req, res, db);
});

app.put('/image', (req, res) => {
    userFlow.entryUpdateHandler(req, res, db);
});

app.post('/imageUrl', (req, res) => {
    userFlow.imageHandler(req, res);
});

app.listen(PORT, () => console.log(`http://${IP}:${PORT}`));
