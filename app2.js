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
	database: 'join_us', 
	multipleStatements: true
});

//homepage
app.get("/", function(req, res){
	connection.query("SELECT COUNT(*) AS count FROM members;", 
		function(error, results){
		if (error) throw error;
		res.render("home", {count: results[0].count, err_msg: ""}); //call the home.ejs file
	});
});

app.get("/err_blk", function(req, res){
	connection.query("SELECT COUNT(*) AS count FROM members;", 
		function(error, results){
		if (error) throw error;
		res.render("home", {count: results[0].count, err_msg: "Space cannot be blank"});
	});
});

app.get("/err_dup", function(req, res){
	connection.query("SELECT COUNT(*) AS count FROM members;", 
		function(error, results){
		if (error) throw error;
		res.render("home", {count: results[0].count, err_msg: "Email already exists"});
	});
});

//post register
app.post("/register", function(req, res){
	var member = {
		email: req.body.email, 
		first_name: req.body.first_name,
		age: req.body.age
	};

	//go to err_blk page if some blanks are not filled
	if (member.email === "" || member.first_name === "" || member.age === "")
		res.redirect("/err_blk");

	//insert new member info to join_us database
	connection.query("INSERT INTO members SET ?", member, function(error, results){
		 //if duplicate email, go to err_dup page
		if (error && error.errno === 1062) 
			res.redirect("/err_dup"); 
		//else, let the newly joined member mark some events
		var q = "SELECT COUNT(*) AS count_appr FROM members WHERE event_appr=1;";
		q += "SELECT COUNT(*) AS count_trip FROM members WHERE event_trip=1;";
		q += "SELECT COUNT(*) AS count_pal FROM members WHERE event_pal=1;";
		q += "SELECT COUNT(*) AS count_learn FROM members WHERE event_learn=1;";
		connection.query(q, function(error, results){
			if (error) throw error;
			var params = {
				count_appr: results[0][0].count_appr, 
				count_trip: results[1][0].count_trip, 
				count_pal: results[2][0].count_pal, 
				count_learn: results[3][0].count_learn
			}
			res.render("events", params);
		});
	});
});

//TODO: ADD COOKIES TO LOCATE personal info with events marked
// 		UPDATE join_us db events_ col for new member
//      END page: "Thanks for signing up, hope to see you in future events"
//                - with an option to go back to homepage
    
app.post("/events_marked", function(req, res){
	res.redirect("/");
});

http.createServer(app).listen(80);



