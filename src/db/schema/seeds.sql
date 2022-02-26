INSERT INTO users(first_name,last_name,email,password)
VALUES ('John','Smith','john123@email.com','123456'),
('Ron','Brown','Ron123@email.com','123456');

INSERT INTO categories(name)
VALUES ('Food'),('Grocery'),('Phone Bills'),('Gas Bills'),('Rent'),('Insurnace'),('Shopping'),('Others');

INSERT INTO user_categories(user_id,category_id)
VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8);
