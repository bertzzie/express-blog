var express   = require('express'),
    app       = express(),
    authRoute = require('./src/routes/auth.js');

app.use(express.static('./src/static'));

app.set('view engine', 'jade');
app.set('views', './src/static/views');

app.get('/', function (req, res) {
    res.render('index');
});

app.use('/auth', authRoute);

var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Blog is running at http://%s:%s', host, port);
});
