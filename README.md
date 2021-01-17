# JOIN_US_app
The project is to build a (basic) JOIN US web app using NodeJS and MySQL. 
Data for this project are randomly generated using `faker` package and hosted on Google Cloud Platform (Cloud SQL).

## Pages

- `/`: Home page for membership registration with email, name and age. It shows current total number of members, and the new member will be added to MySQL database immediately.
- `/register_events`: The newly joined member should mark the events he/she is interested in. The page shows the total number of marks received by each event, and the record associated with the new member will be reflected immediately in database. 
- `register_complete`: Display a message for completion of registration, with an option provided to redirect to home page for another signing up. 


## Running the app

First, create the schema for join_us database in MySQL:
```
source schema.sql
```
Second, import some preliminary data generated using faker package by running:
```
node app1.js
```
Last, run command line:
```
node app2.js
```
and go to `http://localhost/` to register. 

Alternatively, for mac and linux users run 
```
./run.sh
```
However, this resets the database everytime. 

