
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
var num_fake = 266;
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root', 
	password: process.env.mysql_pw, 
	database: 'join_us'
});

var member_data = [];
for (var i = 0; i < num_fake; ++i){
	member_data.push([
		faker.internet.email(), 
		faker.name.firstName(),
		faker.name.gender(), 
		Math.floor(Math.random() * 100) + 5,
		faker.date.past()]);
}

var q = 'INSERT INTO members (email, first_name, gender, age, created_at) VALUES ?';
connection.query(q, [member_data],  
	function(error, results, fields) {
		if (error) throw error;
		console.log(results);   //results[row#].colname
	}
);

connection.end();




