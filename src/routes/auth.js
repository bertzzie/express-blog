var express = require('express'),
    router  = express.Router(),
    bodyParser = require('body-parser'),
    db = require('../database/database');

var textParser = bodyParser.urlencoded({extended: true});

router.get('/login', function (req, res) {
    res.render('auth/login');
});

router.post('/login', function (req, res) {
});

router.get('/logout', function (req, res) {
    res.send('LOGOUT PAGE');
});

router.get('/register', function (req, res) {
    res.render('auth/register');
});

router.post('/register', textParser, function (req, res) {
    var uname = req.body['username'],
        passw = req.body['password'],
        rpass = req.body['retype-password'];

    if (passw === rpass) {
        db.CheckUserExists(uname, make_UserExists(req, res, uname, passw));
    } else {
        res.render('auth/register', {
            flashError: 'Password and Retype Password don\'t match.'
        });
    }
});

function make_UserExists (req, res, uname, passw) {
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
