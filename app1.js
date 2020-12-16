
/*
Part 1: create some fake data using faker package 
		and insert them into join_us database
*/
var mysql = require('mysql'); //mysql package
var faker = require('faker'); //faker package

/*
//testing faker
function gen(){
	console.log(faker.address.streetAddress());
	console.log(faker.address.city());
	console.log(faker.address.state());
	console.log(faker.address.country());
	console.log(faker.date.past());
	console.log(faker.date.past().toString());
}
*/

// insert a specific number of fake data to join_us database
var num_fake = 500;
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root', 
	password: process.env.mysql_pw, 
	database: 'join_us'
});

var user_data = [];
for (var i = 0; i < num_fake; ++i){
	user_data.push([
		faker.internet.email(), 
		faker.address.country(), 
		faker.date.past()]);
}

var q = 'INSERT INTO users (email, country, created_at) VALUES ?';
connection.query(q, [user_data],  
	function(error, results, fields) {
		if (error) throw error;
		console.log(results);   //results[row#].colname
	}
);

connection.end();




