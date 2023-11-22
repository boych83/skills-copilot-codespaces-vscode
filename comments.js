// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var port = 3000;

// Set up MySQL connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlpass',
    database: 'comments'
});

// Connect to MySQL
connection.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

// Create table
connection.query('CREATE TABLE IF NOT EXISTS comments (id INT(10) NOT NULL AUTO_INCREMENT, comment TEXT, PRIMARY KEY (id))', function(err){
    if(err) throw err;
});

// Set up EJS
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// Set up routes
app.get('/', function(req, res){
    connection.query('SELECT * FROM comments', function(err, rows){
        if(err) throw err;
        res.render('index', {comments: rows});
    });
});

app.post('/', urlencodedParser, function(req, res){
    connection.query('INSERT INTO comments SET ?', req.body, function(err){
        if(err) throw err;
        res.redirect('/');
    });
});

app.listen(port, function(){
    console.log('Server is up and running on port ' + port);
});
