
-- Some descriptive statistics for the data generated

SELECT
	DATE_FORMAT(created_at, '%M %D %Y') AS earliest_date 
FROM users 
ORDER BY created_at
LIMIT 1;

SELECT
	email, 
	created_at
FROM users
ORDER BY created_at
LIMIT 1;

SELECT 
	MONTHNAME(created_at) AS month, # DATE_FORMAT(created_at, '%M')
	COUNT(*) AS count
FROM users
GROUP BY month
ORDER BY count DESC;

SELECT
	COUNT(*) AS yahoo_users
FROM users
WHERE email LIKE '%@yahoo.com';

SELECT 
	CASE
		WHEN email LIKE '%@gmail.com' THEN 'gmail'
		WHEN email LIKE '%@yahoo.com' THEN 'yahoo'
		WHEN email LIKE '%@hotmail.com' THEN 'hotmail'
		ELSE 'other'
	END AS provider, 
	COUNT(*) AS total_users
FROM users
GROUP BY provider
ORDER BY total_users DESC; 




