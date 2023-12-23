create table users (
	id BIGSERIAL primary key,
	email varchar(30) not null,
	name varchar(30) not null,
	level varchar(30) not null,
	password varchar(30) not null,
	profile_picture_url text
)

create table cars (
	id BIGSERIAL primary key,
	user_id bigint not null,
	name varchar(30) not null,
	price INT not null,
	size varchar(30) not null,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	deleted boolean,
	picture text
)

create table orders (
	id BIGSERIAL primary key,
	email varchar(30) not null,
	car_id INT,
	start varchar not null,
	finish varchar not null,
	status varchar not null,
	CONSTRAINT car
      FOREIGN KEY(car_id) 
	  REFERENCES cars(id)

)