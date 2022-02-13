DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_monthly_allowance CASCADE;
DROP TABLE IF EXISTS categories  CASCADE;
DROP TABLE IF EXISTS user_categories CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY  NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE users_monthly_allowance (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  budget NUMERIC default 0,
  year varchar(4) default to_char(CURRENT_DATE, 'yyyy'),
  month varchar(3) default to_char(CURRENT_DATE, 'mm')
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
 );

CREATE TABLE user_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE ,
  budget NUMERIC default 0,
  expense NUMERIC NUll,
  year varchar(4) default to_char(CURRENT_DATE, 'yyyy'),
  month varchar(2) default to_char(CURRENT_DATE, 'mm')
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE ,
  amount NUMERIC NOT NULL,
  note VARCHAR(255) DEFAULT NULL,
  date VARCHAR(10) NOT NULL DEFAULT to_char(CURRENT_DATE, 'yyyy-mm-dd'),
  time TIME NOT NULL DEFAULT CURRENT_TIME(0),
  location VARCHAR(255) DEFAULT NULL,
  receipt bytea default Null,
  fixed BOOLEAN default false
);


