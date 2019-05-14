/****************************
一、创建 转账存储过程
*****************************/
IF OBJECT_ID ( 'PTransfer', 'P' ) IS NOT NULL 
    DROP PROCEDURE PTransfer;
GO

CREATE PROCEDURE PTransfer 
		@account_no_x varchar(30),	--x账号
		@account_no_y varchar(30),	--y账号
		@amount_k NUMERIC(8,2)		--转账金额
AS
	BEGIN
		IF (SELECT balance 
			 FROM account 
			 WHERE account_number = @account_no_x) IS NULL
			OR
			(SELECT balance 
			 FROM account 
			 WHERE account_number = @account_no_y) IS NULL
			RETURN -1;
		
			
		BEGIN TRANSACTION;
			--为方便观察数据，把教材的两步次序互换，减x时出错回滚，先前已修改的y账号值会还原。
			--即使第一句出错，对数据库未作修改，为保持程序规范性，也要求回滚！！！

			--（2）**********y账号加上k元***********
			BEGIN TRY
			UPDATE account
			SET balance = balance + @amount_k
			WHERE account_number = @account_no_y;
			END TRY
			--判定上一SQL语句的执行状态
			BEGIN CATCH          --捕获错误并回滚事务
				ROLLBACK;
				RETURN -1;
			END CATCH
			
			--（1）**********X账号减去k元***********
			BEGIN TRY
			UPDATE account
			SET balance = balance - @amount_k
			WHERE account_number = @account_no_x;
			END TRY
			--判定上一SQL语句的执行状态
			BEGIN CATCH          --捕获错误并回滚事务
				ROLLBACK;
				RETURN -1;
			END CATCH
			    
			--（3）**********提交事务***********
			COMMIT;
			RETURN 0;
	END
GO 

/****************************
二、创建 还款存储过程
*****************************/
USE Banking
IF OBJECT_ID('PPayment') IS NOT NULL  --删除同名存储过程
	DROP PROCEDURE PPayment
GO

CREATE PROCEDURE PPayment
	@l_n char(20),   --贷款账号
	--@p_d date,       --还款日期
	@p_a float       --还款金额
AS 
	BEGIN 
		IF (SELECT loan_number      --确保贷款账号不为空
			FROM loan
			WHERE loan_number = @l_n) IS NULL
			OR
			(SELECT PayOverDate           --如果贷款已经还完则退出事务
			 FROM loan
			 WHERE loan_number = @l_n) IS NOT NULL
		RETURN -1;       
		
		DECLARE @p_d date;              --还款时间
		DECLARE @random char(4);        --随机数声明
		DECLARE @p_n char(20);          --还款账号
		DECLARE @TotalPayment float;    --还款总金额
		DECLARE @TotalLoan float;       --贷款总金额
		BEGIN TRANSACTION;              --事务开始
			
			/*开始更新payment表中信息*/
			BEGIN TRY 
			SELECT @p_d = GETDATE();               --获取还款的日期
			/****使用1000以内的随机数加上还款日期作为还款账号******/
			SELECT @p_n = CONVERT(varchar(12),ROUND(((1000 - 0 -1) * RAND() + 0), 0)) + CONVERT(varchar(20), GETDATE(), 0);
			INSERT INTO payment VALUES(@l_n,@p_n,@p_d,@p_a);       --将值插入payment表中
			END TRY
			
			BEGIN CATCH          --捕获错误并回滚事务
				ROLLBACK;
				RETURN -2;
			END CATCH
				
			/*判断贷款是否还完,并依据结果判断是否修改PayOverDate列数据*/
			BEGIN TRY
			SELECT @TotalPayment = SUM(payment_amount)             --累加历次还款的总和
			FROM payment
			WHERE loan_number = @l_n
			
			SELECT @TotalLoan = amount                            --找出贷款总额,用来与之后的还款总和相比较
			FROM loan
			WHERE loan_number = @l_n
			
			IF (@TotalPayment = @TotalLoan)  --如果还款完成则将PayOverDate设置为该次还款日期
				BEGIN 
					UPDATE loan
					SET PayOverDate = @p_d
					WHERE loan_number = @l_n
				END
			IF (@TotalPayment > @TotalLoan)  --如果还款金额大于贷款金额
				BEGIN
					ROLLBACK;	
					RETURN -4;
				END
			END TRY
			/*******判定以上语句是否出错*******/
			BEGIN CATCH          --捕获错误并回滚事务
				ROLLBACK;
				RETURN -3;
			END CATCH
			/***********提交事务*********/
			COMMIT;
			RETURN 0;
		END
GO
/****************************
三、创建 查询账号存储过程
*****************************/
USE Banking
IF OBJECT_ID('PQuery') IS NOT NULL         --删除同名存储过程
	DROP PROCEDURE PQuery;
GO
CREATE PROCEDURE PQuery
	@c_n char(20) output,
	@balance float output,
	@b_n char(20) output,
	@c_c char(20) output,
	@a_n varchar(20)
AS
	BEGIN
		DECLARE @ErrorVar int;
		BEGIN TRANSACTION;
			--DECLARE	@c_n char(20);
			--DECLARE @balance float;
			--DECLARE @b_n char(20);
			--DECLARE @c_c char(20);
			/****开始查询*****/
			SELECT @c_n = customer.customer_name,@balance = balance, @b_n = branch_name,@c_c = customer_city
			FROM depositor, customer, account 
			WHERE depositor.account_number = account.account_number AND
				depositor.customer_name = customer.customer_name AND
				account.account_number = @a_n
			SELECT @ErrorVar = @@Error;
			IF	@ErrorVar != 0
				BEGIN
					ROLLBACK;
					RETURN @ErrorVar;
				END
			/********事物提交*******/
			COMMIT;
			RETURN 0;
	END
GO



/****************************
四、创建 查询贷款存储过程
*****************************/
USE Banking
IF OBJECT_ID('PQueryLoan') IS NOT NULL        --删除同名过程
	DROP PROCEDURE PQueryLoan
GO

CREATE PROCEDURE PQueryLoan
	@l_n char(20),			        --输入参数，贷款账号
	@amount float output,           --输出参数，贷款总额
	@branch_name char(20) output,   --输出参数，贷款支行 
	@paidAmount float output        --输出参数，已还贷款
AS
	BEGIN 
		IF(SELECT loan_number       --如果不存在该贷款账号则退出
		   FROM loan
		   WHERE loan_number = @l_n) IS NULL
		RETURN -1;
		
		BEGIN TRANSACTION
			/***开始查询**/ 
			--（1）查询贷款支行以及贷款总额
			SELECT @amount = amount, @branch_name = branch_name
			FROM loan
			WHERE loan_number = @l_n
		
			--（2）查询已还贷款总额
			SELECT @paidAmount = SUM(payment_amount)
			FROM payment
			WHERE loan_number = @l_n
			
			IF @paidAmount = NULL 
				SELECT @paidAmount = 0;
			/****提交事务***/
			COMMIT;
			RETURN 0;
	END
GO
