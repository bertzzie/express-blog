var mysql = require('mysql'),
    pool  = mysql.createPool({
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DB_BLOG,
        connectionLimit: 10,
        supportBigNumbers: true
    });

exports.CheckUserExists = function (username, callback) {
    var query = "SELECT * FROM users u WHERE u.username = ?;";
    
    queryDatabase(query, [username], callback);
};

exports.CreateNewUser = function (username, password, callback) {
    var query = "INSERT INTO users(`username`, `password`) VALUES (?, ?);";

    queryDatabase(query, [username, password], callback);
};

function queryDatabase(query, data, callback) {
    pool.getConnection(function (poolErr, connection) {
        if (poolErr) {
            console.log(poolErr);
            callback(poolErr);
            return;
        }

        connection.query(query, data, function (connErr, results) {
            connection.release();
            if (connErr) {
                console.log(conErr);
                callback(connErr);
                return;
            }

            callback(false, results);
        });
    });
};
