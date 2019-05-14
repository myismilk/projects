/****************************
һ������ ת�˴洢����
*****************************/
IF OBJECT_ID ( 'PTransfer', 'P' ) IS NOT NULL 
    DROP PROCEDURE PTransfer;
GO

CREATE PROCEDURE PTransfer 
		@account_no_x varchar(30),	--x�˺�
		@account_no_y varchar(30),	--y�˺�
		@amount_k NUMERIC(8,2)		--ת�˽��
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
			--Ϊ����۲����ݣ��ѽ̲ĵ��������򻥻�����xʱ����ع�����ǰ���޸ĵ�y�˺�ֵ�ỹԭ��
			--��ʹ��һ����������ݿ�δ���޸ģ�Ϊ���ֳ���淶�ԣ�ҲҪ��ع�������

			--��2��**********y�˺ż���kԪ***********
			BEGIN TRY
			UPDATE account
			SET balance = balance + @amount_k
			WHERE account_number = @account_no_y;
			END TRY
			--�ж���һSQL����ִ��״̬
			BEGIN CATCH          --������󲢻ع�����
				ROLLBACK;
				RETURN -1;
			END CATCH
			
			--��1��**********X�˺ż�ȥkԪ***********
			BEGIN TRY
			UPDATE account
			SET balance = balance - @amount_k
			WHERE account_number = @account_no_x;
			END TRY
			--�ж���һSQL����ִ��״̬
			BEGIN CATCH          --������󲢻ع�����
				ROLLBACK;
				RETURN -1;
			END CATCH
			    
			--��3��**********�ύ����***********
			COMMIT;
			RETURN 0;
	END
GO 

/****************************
�������� ����洢����
*****************************/
USE Banking
IF OBJECT_ID('PPayment') IS NOT NULL  --ɾ��ͬ���洢����
	DROP PROCEDURE PPayment
GO

CREATE PROCEDURE PPayment
	@l_n char(20),   --�����˺�
	--@p_d date,       --��������
	@p_a float       --������
AS 
	BEGIN 
		IF (SELECT loan_number      --ȷ�������˺Ų�Ϊ��
			FROM loan
			WHERE loan_number = @l_n) IS NULL
			OR
			(SELECT PayOverDate           --��������Ѿ��������˳�����
			 FROM loan
			 WHERE loan_number = @l_n) IS NOT NULL
		RETURN -1;       
		
		DECLARE @p_d date;              --����ʱ��
		DECLARE @random char(4);        --���������
		DECLARE @p_n char(20);          --�����˺�
		DECLARE @TotalPayment float;    --�����ܽ��
		DECLARE @TotalLoan float;       --�����ܽ��
		BEGIN TRANSACTION;              --����ʼ
			
			/*��ʼ����payment������Ϣ*/
			BEGIN TRY 
			SELECT @p_d = GETDATE();               --��ȡ���������
			/****ʹ��1000���ڵ���������ϻ���������Ϊ�����˺�******/
			SELECT @p_n = CONVERT(varchar(12),ROUND(((1000 - 0 -1) * RAND() + 0), 0)) + CONVERT(varchar(20), GETDATE(), 0);
			INSERT INTO payment VALUES(@l_n,@p_n,@p_d,@p_a);       --��ֵ����payment����
			END TRY
			
			BEGIN CATCH          --������󲢻ع�����
				ROLLBACK;
				RETURN -2;
			END CATCH
				
			/*�жϴ����Ƿ���,�����ݽ���ж��Ƿ��޸�PayOverDate������*/
			BEGIN TRY
			SELECT @TotalPayment = SUM(payment_amount)             --�ۼ����λ�����ܺ�
			FROM payment
			WHERE loan_number = @l_n
			
			SELECT @TotalLoan = amount                            --�ҳ������ܶ�,������֮��Ļ����ܺ���Ƚ�
			FROM loan
			WHERE loan_number = @l_n
			
			IF (@TotalPayment = @TotalLoan)  --������������PayOverDate����Ϊ�ôλ�������
				BEGIN 
					UPDATE loan
					SET PayOverDate = @p_d
					WHERE loan_number = @l_n
				END
			IF (@TotalPayment > @TotalLoan)  --�����������ڴ�����
				BEGIN
					ROLLBACK;	
					RETURN -4;
				END
			END TRY
			/*******�ж���������Ƿ����*******/
			BEGIN CATCH          --������󲢻ع�����
				ROLLBACK;
				RETURN -3;
			END CATCH
			/***********�ύ����*********/
			COMMIT;
			RETURN 0;
		END
GO
/****************************
�������� ��ѯ�˺Ŵ洢����
*****************************/
USE Banking
IF OBJECT_ID('PQuery') IS NOT NULL         --ɾ��ͬ���洢����
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
			/****��ʼ��ѯ*****/
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
			/********�����ύ*******/
			COMMIT;
			RETURN 0;
	END
GO



/****************************
�ġ����� ��ѯ����洢����
*****************************/
USE Banking
IF OBJECT_ID('PQueryLoan') IS NOT NULL        --ɾ��ͬ������
	DROP PROCEDURE PQueryLoan
GO

CREATE PROCEDURE PQueryLoan
	@l_n char(20),			        --��������������˺�
	@amount float output,           --��������������ܶ�
	@branch_name char(20) output,   --�������������֧�� 
	@paidAmount float output        --����������ѻ�����
AS
	BEGIN 
		IF(SELECT loan_number       --��������ڸô����˺����˳�
		   FROM loan
		   WHERE loan_number = @l_n) IS NULL
		RETURN -1;
		
		BEGIN TRANSACTION
			/***��ʼ��ѯ**/ 
			--��1����ѯ����֧���Լ������ܶ�
			SELECT @amount = amount, @branch_name = branch_name
			FROM loan
			WHERE loan_number = @l_n
		
			--��2����ѯ�ѻ������ܶ�
			SELECT @paidAmount = SUM(payment_amount)
			FROM payment
			WHERE loan_number = @l_n
			
			IF @paidAmount = NULL 
				SELECT @paidAmount = 0;
			/****�ύ����***/
			COMMIT;
			RETURN 0;
	END
GO
