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
		var params = {count: results[0].count, err_msg: ""};
		res.render("home", params); //call the home.ejs file
	});
});

app.get("/err", function(req, res){
	var q = "SELECT COUNT(*) AS count FROM members";
	connection.query(q, function(error, results){
		if (error) throw error;
		var params = {count: results[0].count, err_msg: "Space cannot be blank"};
		res.render("home", params); //call the home.ejs file
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
	if (user.email === "" || user.first_name === "" || 
		user.gender === "" || user.age === ""){
		res.redirect("/err");
		return ;
	}
	connection.query("INSERT INTO members SET ?", user, function(error, results){
		if (error) throw error;
		res.render("events")
	});
});
	
//TODO: ADD THE QUERY FOR EVENT COL LATER
app.post("/mark_events", function(req, res){
	res.send("Your event is marked");
});


http.createServer(app).listen(80);



