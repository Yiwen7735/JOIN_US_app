# JOIN_US_app
The project is to build a (basic) JOIN US web app using NodeJS and MySQL.

## Pages

- `/register`: sign up for membership with email, name and age (new member added to MySQL database)
- `/register_events`: mark the events interested (records associated with the member will be updated in database)
- `register_complete`: registration complete message (with an option to redirect to `/register` page) 


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