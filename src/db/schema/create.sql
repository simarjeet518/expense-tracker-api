DROP TABLE IF EXISTS days ;


CREATE TABLE days (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  year varchar(6) default to_char(CURRENT_DATE, 'yyyy'),
  month varchar(2) default to_char(CURRENT_DATE, 'mm')
);
