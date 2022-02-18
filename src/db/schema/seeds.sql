INSERT INTO users(first_name,last_name,email,password)
VALUES ('John','Smith','john123@email.com','123456'),
('Ron','Brown','Ron123@email.com','123456');

INSERT INTO categories(name)
VALUES ('Food'),('Grocery'),('Phone Bill'),('Gas Bill'),('Fun Money'),('Rent'),('Car Insurnace'),('Shopping'),('Others');

-- Insert INTO users_monthly_allowance(user_id, budget)
-- VALUES (1,5000);

-- Insert INTO users_monthly_allowance(user_id, budget)
-- VALUES (1,5000);

INSERT INTO user_categories(user_id,category_id,budget)
VALUES (1,1,500),(1,2,1000);

INSERT INTO user_categories(user_id,category_id)
VALUES (1,3),(1,5),(1,4),(1,6),(1,7),(1,1),(1,2),(2,8);

-- INSERT INTO transactions(user_id,category_id,amount,date)
-- VALUES (1,1,120,CURRENT_DATE),(1,2,10.30,'2022-02-05'),(1,4,120,'2022-02-03'),(1,5,300,'2022-02-06'),(1,2,10.30,'2022-01-05'),(1,4,120,'2022-01-03'),(1,5,300,'2022-01-06'),(1,3,103,'2022-02-05'),(1,5,100,'2022-02-07'),(1,7,300,'2022-02-06');

-- INSERT INTO transactions(user_id,category_id,amount)
-- Values (1, 1,800);