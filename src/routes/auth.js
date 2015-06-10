var express = require('express'),
    router  = express.Router(),
    bodyParser = require('body-parser'),
    db = require('../database/database');

var urlEncodedParser = bodyParser.urlencoded({extended: true});

router.get('/login', function (req, res) {
    res.render('auth/login');
});

router.post('/login', urlEncodedParser, function (req, res) {
    var uname = req.body['username'],
        passw = req.body['password'];

    db.CheckUserExists(uname, make_UserExistsLogin(req, res, uname, passw));
});

router.get('/logout', function (req, res) {
    res.send('LOGOUT PAGE');
});

router.get('/register', function (req, res) {
    res.render('auth/register');
});

router.post('/register', urlEncodedParser, function (req, res) {
    var uname = req.body['username'],
        passw = req.body['password'],
        rpass = req.body['retype-password'];

    if (passw === rpass) {
        db.CheckUserExists(uname, make_UserExistsRegister(req, res, uname, passw));
    } else {
        res.render('auth/register', {
            flashError: 'Password and Retype Password don\'t match.'
        });
    }
});

function make_UserExistsLogin(req, res, uname, passw) {
    return function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Query Failed.');
            return;
        }

        if (results.length > 0) { // user ada
            var bcrypt = require('bcrypt'),
                user   = results[0];

            if(bcrypt.compareSync(passw, user['password'])) {
                res.render('index', {
                    flashInfo: 'Welcome, ' + user['username'] + '!'
                });
            } else {
                res.render('auth/login', {
                    flashError: 'Wrong password'
                });
            }

        } else { // username tidak ada
            res.render('auth/login', {
                flashError: 'User not found'
            });
        }
    }
};

function make_UserExistsRegister(req, res, uname, passw) {
    return function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Query Failed.');
            return;
        }

        if (results.length > 0) { // username telah ada
            res.render('auth/register', {
                flashError: 'Username already exists'
            });
        } else { // username belum ada
            db.CreateNewUser(uname, passw, make_CreateUser(req, res));
        }
    }
};

function make_CreateUser(req, res) {
    return function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Insertion Failed.');
            return;
        }

        var info = 'Register Success. Please login now!';
        res.render('auth/login', {flashInfo: info});
    };
};

module.exports = router;
