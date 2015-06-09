var express = require('express'),
    router  = express.Router();

router.get('/login', function (req, res) {
    res.render('auth/login');
});

router.post('/login', function (req, res) {
});

router.get('/logout', function (req, res) {
    res.send('LOGOUT PAGE');
});

router.get('/register', function (req, res) {
    res.send('REGISTER PAGE');
});

module.exports = router;
