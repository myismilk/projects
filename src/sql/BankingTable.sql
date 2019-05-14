
CREATE TABLE branch(
	branch_name char(20),
	branch_city char(20),
	assets float,
	PRIMARY KEY(branch_name));
	
CREATE TABLE customer(
	customer_name char(20),
	customer_street char(20),
	customer_city char(20),
	PRIMARY KEY(customer_name));

CREATE TABLE account(
	account_number char(20),
	branch_name char(20),
	balance float,
	FOREIGN KEY (branch_name)
		REFERENCES branch(branch_name),
	PRIMARY KEY (account_number));

CREATE TABLE depositor(
	customer_name char(20),
	account_number char(20)
	FOREIGN KEY (account_number)
		REFERENCES account(account_number),
	FOREIGN KEY (customer_name)
		REFERENCES customer(customer_name));

CREATE TABLE loan(
	loan_number char(20),
	branch_name char(20),
	amount float,
	PRIMARY KEY (loan_number),
	FOREIGN KEY (branch_name)
		REFERENCES branch(branch_name));

CREATE TABLE borrower(
	customer_name char(20),
	loan_number char(20),
	FOREIGN KEY (loan_number)
		REFERENCES loan(loan_number),
	FOREIGN KEY (customer_name)
		REFERENCES customer(customer_name),);
		

