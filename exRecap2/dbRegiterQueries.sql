CREATE TABLE users ( 
	id int IDENTITY (1,1),
	firstname varchar(50),
	lastname varchar (50),
	tel varchar(50),
	city varchar(50),
	email varchar(50),
	pseudo varchar(50),
	password varchar (100),
	jwt VARCHAR(500),
	PRIMARY KEY (id)
)

INSERT INTO users VALUES ('Prenom', 'Nom', '0123456789', 'ville',  'e@mail.com', 'pseu', 'pwd', null)

SELECT * FROM users

DROP TABLE users

DELETE FROM users WHERE id > 1
