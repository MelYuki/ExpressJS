CREATE TABLE infos ( 
	infos_id int IDENTITY (1,1),
	firstname varchar(50),
	lastname varchar (50),
	email varchar(50),
	password varchar (100),
	PRIMARY KEY (infos_id)
)

INSERT INTO infos VALUES (
	'Mel',
	'Taï',
	'e@mail.be',
	'P@sswd')

SELECT * FROM infos