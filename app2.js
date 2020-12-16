/*
This is the 'main' file that
displays homepage, takes user input & updates sql database
*/
//packages required
var mysql = require('mysql'); 
var express = require('express'); 
var http = require('http');      
var parser = require('body-parser');

var app = express();
app.set("view engine", "ejs"); //include html file
app.use(parser.urlencoded({extended: true}));   //parse data from html body 
app.use(express.static(__dirname + "/style")); //include css file

//build connection with mysql
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root', 
	password: process.env.mysql_pw, 
	database: 'join_us'
});

//homepage
app.get("/", function(req, res){
	var q = "SELECT COUNT(*) AS count FROM members";
	connection.query(q, function(error, results){
		if (error) throw error;
		res.render("home", {count: results[0].count}); //call the home.ejs file
	});
});

//post register
app.post("/register", function(req, res){
	var user = {
		email: req.body.email, 
		first_name: req.body.first_name,
		gender: req.body.gender, 
		age: req.body.age
	};
	connection.query("INSERT INTO members SET ?", user, function(error, results){
		if (error) throw error;
		res.redirect("/"); //redirect to homepage after signing up
	});
});

/*
//testing
app.get("/lucky_num", function(req, res){
	var rnum = Math.floor(Math.random() * 10) + 1;
	res.send("Your lucky number is " + rnum);
})
*/
http.createServer(app).listen(80);



