const app = require('express')();
const os = require('os');
const ifaces = os.networkInterfaces();
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'cev',
        password: '',
        database: 'brain-reco'
    }
});
const userCountFile = __dirname + '/userCount.txt';
const databaseFile = __dirname + '/data.json';
const port = 4000;
let ip;

Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
            ip = iface.address;
        }
        ++alias;
    });
});

db
    .select('*')
    .from('users')
    .then(console.log);

let database = {
    users: []
};
try {
    database = JSON.parse(fs.readFileSync(databaseFile));
} catch (err) {
    console.log('database file does not exist... yet');
}

let userCounter = 1;
try {
    userCounter = JSON.parse(fs.readFileSync(userCountFile));
} catch (err) {
    console.log('userCounter file does not exist... yet');
}

const cookieJar = {};

app.use(bodyParser.json());
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    })
);
app.get('/test', (req, res) => {
    res.send({ res: 'success!' });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db
        .transaction(trx => {
            trx
                .insert({
                    hash,
                    email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            username,
                            email: loginEmail[0],
                            joined: new Date()
                        })
                        .then(user => {
                            return res.status(200).send({
                                res: true,
                                body: user[0]
                            });
                        });
                })
                .then(trx.commit)
                .catch(trx.rollback);
        })

        .catch(err =>
            res.status(400).send({
                res: false,
                status: 'Username or email already exists!'
            })
        );
});

app.post('/login', (req, res) => {
    let { password, email } = req.body;
    db
        .select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db
                    .select('*')
                    .from('users')
                    .where('email', '=', email)
                    .then(user => {
                        const { id, username, entries } = user[0];
                        res.status(200).send({
                            res: true,
                            id,
                            name: username,
                            entryCount: entries
                        });
                    });
            } else {
                res.send({
                    res: false,
                    status: 'Invalid password'
                });
            }
        })
        .catch(err => {
            res.send({
                res: false,
                status: 'Invalid email'
            });
        });
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db
        .select('*')
        .from('users')
        .where({
            id
        })
        .then(user => {
            if (user.length) {
                res.send({
                    res: true,
                    body: user
                });
            } else {
                res.status(404).send({
                    res: false,
                    status: 'not found'
                });
            }
        })
        .catch(err =>
            res.status(400).send({
                res: false,
                status: 'database error'
            })
        );
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.send({
                res: true,
                entryCount: entries[0]
            });
        })
        .catch(err =>
            res.status(400).send({
                res: false,
                status: 'database error'
            })
        );
});

app.get('/checkSession', (req, res) => {
    for (let user of database.users) {
        if (cookieJar[req.session.id] === user.id) {
            res.send({
                res: true,
                id: user.id,
                entryCount: user.entries,
                name: user.username
            });
        } else {
            res.send({ res: false });
        }
    }
});

app.listen(port, () => console.log(`http://${ip}:${port}`));
