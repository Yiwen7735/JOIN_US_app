# JOIN_US_app
The project is to build a (basic) JOIN US web app using NodeJS and MySQL.

## Pages

- `/register`: Sign up for membership with email, name and age. The page shows current total number of members, and the new member will be added to MySQL database immediately.
- `/register_events`: The newly joined member should mark the events he/she is interested in. The page shows the total number of marks received by each event, and the record associated with the new member will be reflected immediately in database. 
- `register_complete`: Display a message for completion of registration, with an option provided to redirect to `/register` page for another signing up. 


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
and go to `http://localhost/register` to sign up for membership.