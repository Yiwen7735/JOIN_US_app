echo "create db: local pw"
mysql --host=35.237.49.11 --user=root --password < schema.sql
read -p 'Please enter your mysql password: ' pw
export mysql_pw=$pw
node app1.js
node app2.js

