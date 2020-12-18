DROP DATABASE IF EXISTS join_us;
CREATE DATABASE join_us;
USE join_us;

CREATE TABLE members (
	email VARCHAR(255) PRIMARY KEY,
	first_name VARCHAR(255), 
	age INT NOT NULL,
	event_appr INT NOT NULL DEFAULT 0, 
	event_trip INT NOT NULL DEFAULT 0, 
	event_pal INT NOT NULL DEFAULT 0, 
	event_learn INT NOT NULL DEFAULT 0, 
	created_at TIMESTAMP DEFAULT NOW()
);

